import {client} from '../axios';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
}

export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const res = await client.post('/auth/register', userData);

  if (res.status >= 300) {
    throw new Error('Registration failed');
  }

  return res.data;
};
