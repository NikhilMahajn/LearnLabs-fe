import axios from "axios";

const live_url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: live_url,
  withCredentials: true, 
});

export default api;
