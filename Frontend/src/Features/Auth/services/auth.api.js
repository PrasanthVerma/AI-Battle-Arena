import axios from "axios";

const baseURL = import.meta.env.VITE_API_URI 
    ? `${import.meta.env.VITE_API_URI}/api` 
    : '/api';

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});


export async function register({ email, username, password }) {
    const response = await api.post("/auth/register", { email, username, password })
    return response.data
}


export async function login({ email, password }) {
    const response = await api.post("/auth/login", { email, password })
    return response.data
}


export async function getme() {
    const response = await api.get("/auth/profile")
    return response.data
}


export async function logout() {
    const response = await api.get("/auth/logout")
    return response.data
}

// ========== GOOGLE OAUTH FUNCTIONS ==========

// Initiate Google OAuth flow
export async function googleAuth() {
    // This redirects to Google OAuth endpoint
    const oauthUrl = import.meta.env.VITE_API_URI 
        ? `${import.meta.env.VITE_API_URI}/api/auth/google` 
        : '/api/auth/google';
    window.location.href = oauthUrl;
}

// Get current user based on session
export async function getCurrentUser() {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get user');
    }
}