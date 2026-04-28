import axios from "axios";

const baseURL = import.meta.env.VITE_API_URI
    ? `${import.meta.env.VITE_API_URI}/api`
    : '/api';

const api = axios.create({ baseURL, withCredentials: true });

export async function fetchChats() {
    const response = await api.get("/chats");
    return response.data.chats;
}

export async function fetchChatMessages(chatId) {
    const response = await api.get(`/chats/${chatId}`);
    return response.data;
}
