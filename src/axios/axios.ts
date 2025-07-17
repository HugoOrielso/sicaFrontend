import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

interface RefreshResponse {
    accessToken: string;
}

interface FailedRequest {
    resolve: (token: string) => void;
    reject: (err: AxiosError) => void;
}

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4321/api', // Cambia según tu entorno
    withCredentials: true, // Enviar cookies (refreshToken)
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(

    (response: AxiosResponse) => response,
    async (error: AxiosError): Promise<AxiosResponse | void> => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            if (originalRequest.headers) {
                                originalRequest.headers['Authorization'] = `${token}`;
                            }
                            resolve(api(originalRequest));
                        },
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.get<RefreshResponse>('http://localhost:4321/api/auth/refresh', {
                    withCredentials: true,
                });

                const newToken = response.data.accessToken;

                localStorage.setItem('accessToken', newToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                processQueue(null, newToken);

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            if (config.headers) {
                config.headers['Authorization'] = `${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
