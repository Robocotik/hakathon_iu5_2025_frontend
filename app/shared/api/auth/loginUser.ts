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
  const res = await client.post('/login', credentials);

  if (res.status >= 300) {
    throw new Error('Login failed');
  }

  return res.data;
};
