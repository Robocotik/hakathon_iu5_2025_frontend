import { useQuery } from '@tanstack/react-query';
import { getHistoryData, type HistoryItem } from '../../shared/api/history/getHistory';

export const useGetHistory = () => {
  const query = useQuery<HistoryItem[], Error>({
    queryKey: ['getHistory'],
    queryFn: getHistoryData,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  return {
    history: query.data || [],
    success: query.isSuccess,
    error: query.error?.message || null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
