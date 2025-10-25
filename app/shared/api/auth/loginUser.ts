import { client } from '../axios';
import { authTokenUtils } from '../../utils/authToken';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
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

    const data = res.data;

    // Сохраняем токен в localStorage после успешного входа
    if (data.token) {
      authTokenUtils.setToken(data.token);
      console.log('Auth token saved to localStorage');
    }

    return data;
  } catch (error: unknown) {
    // Проверяем, является ли это ошибкой axios
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_NETWORK') {
      throw new Error('Ошибка сети. Проверьте подключение к серверу.');
    }

    // Проверяем статус ответа
    if (error && typeof error === 'object' && 'response' in error && error.response) {
      const response = error.response as { status: number };
      const status = response.status;
      if (status === 401) {
        throw new Error('Неверный email или пароль');
      } else if (status === 422) {
        throw new Error('Некорректные данные');
      } else if (status >= 500) {
        throw new Error('Ошибка сервера. Попробуйте позже.');
      }
    }

    const message = error instanceof Error ? error.message : 'Произошла ошибка при входе';
    throw new Error(message);
  }
};
