import {useMutation} from '@tanstack/react-query';
import {
  registerUser,
  type RegisterRequest,
  type RegisterResponse,
} from '../../shared/api/register/registerUser';

export const useRegisterUser = () => {
  const mutation = useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: registerUser,
    onSuccess: data => {
      // Сохраняем токен в localStorage или cookies
      localStorage.setItem('authToken', data.token);
    },
    onError: error => {
      console.error('Registration failed:', error);
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
