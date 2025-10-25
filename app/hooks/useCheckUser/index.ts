import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {type CheckResponse, checkUser} from '../../shared/api/check/checkUser';
import {authTokenUtils} from '../../shared/utils/authToken';

export const useCheckUser = () => {
  const query = useQuery<CheckResponse, Error>({
    queryKey: ['checkUser'],
    queryFn: checkUser,
    enabled: false, // Не запускаем автоматически
  });

  return {
    check: query.refetch,
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
