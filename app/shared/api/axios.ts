import axios from 'axios';
import {authTokenUtils} from '../utils/authToken';

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

// Интерцептор для обработки ошибок CORS и авторизации
client.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error: ', error);

    // Обработка ошибок авторизации
    if (error.response?.status === 401) {
      // Токен истек или недействителен - очищаем localStorage
      authTokenUtils.removeToken();
      console.log('Token expired or invalid, removed from localStorage');

      // Перенаправляем на страницу входа только если мы не на странице логина
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    if (error.code === 'ERR_NETWORK') {
      throw new Error('Ошибка сети. Проверьте настройки CORS на сервере.');
    }

    return Promise.reject(error);
  },
);

// Интерцептор для логирования запросов и добавления токена
client.interceptors.request.use(
  config => {
    console.log('Making request to:', `${config.baseURL || ''}${config.url || ''}`);

    // Добавляем Authorization токен из localStorage
    const token = authTokenUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization token to request');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
