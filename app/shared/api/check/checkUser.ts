import {client} from '../axios';

export interface CheckRequest {}

export interface CheckResponse {
  user_id: string;
  username: string;
  email: string;
  access_token: string;
}

export const checkUser = async (): Promise<CheckResponse> => {
  const res = await client.get('/auth/check');

  if (res.status >= 300) {
    throw new Error('User check failed');
  }

  return res.data;
};
