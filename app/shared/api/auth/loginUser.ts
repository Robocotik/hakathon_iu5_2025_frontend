import {client} from '../axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const res = await client.post('/auth/login', credentials);

    if (res.status >= 300) {
      throw new Error('Login failed');
    }

    return res.data;
  } catch (error: any) {
    // Проверяем, является ли это ошибкой CORS
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Ошибка сети. Проверьте подключение к серверу.');
    }

    // Проверяем статус ответа
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new Error('Неверный email или пароль');
      } else if (status === 422) {
        throw new Error('Некорректные данные');
      } else if (status >= 500) {
        throw new Error('Ошибка сервера. Попробуйте позже.');
      }
    }

    throw new Error(error.message || 'Произошла ошибка при входе');
  }
};
