import axios from "axios";

const api = axios.create({
    baseURL: "https://naregua.servehttp.com/api",
    });

export default api;
