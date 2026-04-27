import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URI}/api`,
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
