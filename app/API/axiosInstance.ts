import axios from "axios";
const BASE_URL:any = process.env.NEXT_PUBLIC_AUTH_API

const api = axios.create({
    baseURL: BASE_URL
});

export default api;