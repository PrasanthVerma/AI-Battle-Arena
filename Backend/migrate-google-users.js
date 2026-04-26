/**
 * Migration Script: Sync Google OAuth Users
 * 
 * This script ensures all users created through Google OAuth before this
 * implementation are properly synced with the new schema fields.
 * 
 * Run with: node migrate-google-users.js
 */

import mongoose from "mongoose";
import User from "./src/Models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

async function migrateGoogleUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || "", {});
        console.log("✅ Connected to MongoDB");

        // Find all users who have a googleId (these were created via OAuth)
        const googleUsers = await User.find({
            googleId: { $exists: true, $ne: null },
        });

        console.log(`\n📊 Found ${googleUsers.length} Google OAuth users`);

        if (googleUsers.length === 0) {
            console.log("✨ No Google users to migrate");
            await mongoose.connection.close();
            return;
        }

        let migrated = 0;
        let failed = 0;

        for (const user of googleUsers) {
            try {
                // Set authProvider if not set
                if (!user.authProvider || user.authProvider !== "google") {
                    user.authProvider = "google";
                }

                // Ensure password is null for OAuth users
                if (!user.password) {
                    user.password = null;
                }

                // Ensure displayName and profilePicture exist
                if (!user.displayName) {
                    user.displayName = user.username || "User";
                }

                if (!user.profilePicture) {
                    user.profilePicture = null;
                }

                // Set timestamps if not present
                if (!user.createdAt) {
                    user.createdAt = new Date();
                }
                if (!user.updatedAt) {
                    user.updatedAt = new Date();
                }

                // Save the updated user
                await user.save();
                migrated++;
                console.log(`✓ Migrated: ${user.email} (ID: ${user._id})`);
            } catch (error) {
                failed++;
                console.error(`✗ Failed to migrate ${user.email}:`, error.message);
            }
        }

        console.log(`\n✅ Migration complete!`);
        console.log(`   - Migrated: ${migrated}`);
        console.log(`   - Failed: ${failed}`);

        // Close connection
        await mongoose.connection.close();
        console.log("\n🔌 Disconnected from MongoDB");
    } catch (error) {
        console.error("❌ Migration failed:", error.message);
        process.exit(1);
    }
}

// Run migration
migrateGoogleUsers();
