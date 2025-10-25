import { useMutation } from '@tanstack/react-query';
import {
  loginUser,
  type LoginCredentials,
  type LoginResponse,
} from '../../shared/api/auth/loginUser';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Сохраняем токен в localStorage или cookies
      localStorage.setItem('authToken', data.access_token);
      router.push('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
