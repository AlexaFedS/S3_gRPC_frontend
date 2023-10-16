import axios from 'axios';
import { LOCAL_STORAGE_AUTH_TOKEN } from 'constants/localStorage';

export const axiosInstance = axios.create({ baseURL: 'http://localhost:8000/', withCredentials: true });

axiosInstance.interceptors.request.use((config) => {
    if (config.headers) {
        if (localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN)) {
            config.headers.Authorization = `Token ${localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN)}`;
        }
    }

    return config;
});
