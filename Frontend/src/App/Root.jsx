import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../Features/Auth/hooks/useAuth';

/**
 * Root Layout Component
 * Checks for active session on app load
 * Syncs user data to Redux store from backend session
 */
export default function Root() {
    const { handleCheckSession } = useAuth();

    useEffect(() => {
        // Check if user has an active session when app loads
        handleCheckSession();
    }, []);

    return <Outlet />;
}
