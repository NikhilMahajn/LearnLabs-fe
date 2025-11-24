import axios from "axios";
import { useLoader } from "../context/loaderContext";

const live_url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: live_url,
  withCredentials: true, 
});

export default api;

export const useApi = () => {
  const { setIsLoading } = useLoader();

  api.interceptors.request.use((config) => {
    setIsLoading(true);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  return api;
};
