import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  // Временно убираем withCredentials для тестирования CORS
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Интерцептор для обработки ошибок CORS
client.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error: ', error);

    if (error.code === 'ERR_NETWORK') {
      throw new Error('Ошибка сети. Проверьте настройки CORS на сервере.');
    }

    return Promise.reject(error);
  },
);

// Интерцептор для логирования запросов
client.interceptors.request.use(
  config => {
    console.log('Making request to:', `${config.baseURL || ''}${config.url || ''}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
