import {client} from '../axios';
import type {IUser} from '@/domain/entities/user';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: IUser;
}

export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const res = await client.post('/register', userData);

  if (res.status >= 300) {
    throw new Error('Registration failed');
  }

  return res.data;
};
