import axios from "axios";

const baseURL = import.meta.env.VITE_API_URI 
    ? `${import.meta.env.VITE_API_URI}/api` 
    : '/api';

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})


const graphArena = async (prompt) => {
    try {
        const response = await api.post("/use-graph", { problem: prompt });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default graphArena;
