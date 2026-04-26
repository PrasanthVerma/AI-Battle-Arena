import axios from "axios";

const api = axios.create({
    baseURL:"heep://localhost:3000/api",
    withCredentials:true,
})