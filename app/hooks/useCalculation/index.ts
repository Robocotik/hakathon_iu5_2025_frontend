import { useState, useCallback } from 'react';
import {
  createCalculation,
  type CalculationRequest,
  type CalculationResult,
  type CalculationStatus,
  type CalculationError,
} from '../../shared/api/calculation/socketCalculation';

interface UseCalculationState {
  isCalculating: boolean;
  currentJobId: string | null;
  result: CalculationResult | null;
  status: CalculationStatus | null;
  error: string | null;
  progress: number;
}

export const useCalculation = () => {
  const [state, setState] = useState<UseCalculationState>({
    isCalculating: false,
    currentJobId: null,
    result: null,
    status: null,
    error: null,
    progress: 0,
  });

  const calculate = useCallback(async (data: CalculationRequest) => {
    setState((prev) => ({
      ...prev,
      isCalculating: true,
      error: null,
      result: null,
      status: null,
      progress: 0,
    }));

    try {
      const jobId = await createCalculation(
        data,
        // onResult
        (result: CalculationResult) => {
          console.log('Calculation completed:', result);
          setState((prev) => ({
            ...prev,
            isCalculating: false,
            result,
            progress: 100,
            currentJobId: result.jobId,
          }));
        },
        // onStatus
        (status: CalculationStatus) => {
          console.log('Status update:', status);
          setState((prev) => ({
            ...prev,
            status,
            currentJobId: status.jobId,
            progress: getProgressFromStatus(status.status),
          }));
        },
        // onError
        (error: CalculationError) => {
          console.error('Calculation error:', error);
          setState((prev) => ({
            ...prev,
            isCalculating: false,
            error: error.error || error.message || 'Ошибка расчета',
            currentJobId: error.jobId,
          }));
        },
      );

      setState((prev) => ({
        ...prev,
        currentJobId: jobId,
      }));
    } catch (error) {
      console.error('Failed to start calculation:', error);
      setState((prev) => ({
        ...prev,
        isCalculating: false,
        error: error instanceof Error ? error.message : 'Ошибка запуска расчета',
      }));
    }
  }, []);

  const resetCalculation = useCallback(() => {
    setState({
      isCalculating: false,
      currentJobId: null,
      result: null,
      status: null,
      error: null,
      progress: 0,
    });
  }, []);

  return {
    ...state,
    calculate,
    resetCalculation,
  };
};

// Функция для получения прогресса из статуса
const getProgressFromStatus = (status: string): number => {
  switch (status) {
    case 'queued':
      return 10;
    case 'processing':
      return 50;
    case 'completed':
      return 100;
    case 'error':
      return 0;
    default:
      return 0;
  }
};
