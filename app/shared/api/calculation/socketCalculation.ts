import { socketService } from '../../services/socketService';
import { authTokenUtils } from '../../utils/authToken';

export interface Observation {
  ra_hours: number;
  dec_degrees: number;
  timestamp: number;
}

export interface CalculationRequest {
  observations: Observation[];
}

export interface CalculationResult {
  jobId: string;
  success: boolean;
  error: string;
  semi_major_axis_au: number;
  eccentricity: number;
  inclination_deg: number;
  longitude_ascending_node_deg: number;
  argument_perihelion_deg: number;
  perihelion_passage_jd: number;
  closest_approach_jd: number;
  closest_distance_au: number;
}

export interface CalculationStatus {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
}

export interface CalculationError {
  jobId: string;
  error: string;
  message?: string;
}

// Функция для создания расчета
export const createCalculation = (
  data: CalculationRequest,
  onResult: (result: CalculationResult) => void,
  onStatus: (status: CalculationStatus) => void,
  onError: (error: CalculationError) => void,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const socket = socketService.connect();

    const token = authTokenUtils.getToken();
    if (!token) {
      reject(new Error('Требуется авторизация'));
      return;
    }

    // Функция для отправки данных
    const sendCalculation = async () => {
      if (!socket.connected) {
        reject(new Error('Socket не подключен'));
        return;
      }

      // Ждем пока придет userId от сервера
      try {
        console.log('✅ Waiting for userId from server...');
        const userId = await socketService.waitForUserId();
        console.log('✅ UserID received:', userId);

        // Слушаем события результата
        const resultHandler = (result: any) => {
          console.log('Received result:', result);
          let parsedResult: CalculationResult;

          if (typeof result === 'string') {
            try {
              parsedResult = JSON.parse(result);
            } catch {
              parsedResult = result as unknown as CalculationResult;
            }
          } else {
            parsedResult = result as CalculationResult;
          }

          onResult(parsedResult);
          cleanup();
          resolve(parsedResult.jobId);
        };

        // Слушаем события статуса
        const statusHandler = (status: any) => {
          console.log('Received status:', status);
          let parsedStatus: CalculationStatus;

          if (typeof status === 'string') {
            try {
              parsedStatus = JSON.parse(status);
            } catch {
              parsedStatus = status as unknown as CalculationStatus;
            }
          } else {
            parsedStatus = status as CalculationStatus;
          }

          onStatus(parsedStatus);
        };

        // Слушаем события ошибок
        const errorHandler = (error: any) => {
          console.error('Received error:', error);
          let parsedError: CalculationError;

          if (typeof error === 'string') {
            try {
              parsedError = JSON.parse(error);
            } catch {
              parsedError = { jobId: '', error: error, message: error };
            }
          } else {
            parsedError = error as CalculationError;
          }

          onError(parsedError);
          cleanup();
          reject(new Error(parsedError.error || parsedError.message || 'Ошибка расчета'));
        };

        // Функция очистки слушателей
        const cleanup = () => {
          socket.off('result', resultHandler);
          socket.off('status', statusHandler);
          socket.off('error', errorHandler);
        };

        // Устанавливаем слушатели
        socket.on('result', resultHandler);
        socket.on('status', statusHandler);
        socket.on('error', errorHandler);

        // Отправляем запрос в формате как в примере
        const requestData = {
          userId: userId, // ← userId в теле сообщения
          observations: data.observations,
        };

        console.log('Sending calculation request:', requestData);
        console.log('Socket auth:', socket.auth);
        console.log('Socket headers:', socket.io.opts.extraHeaders);
        console.log('User ID for request:', userId);

        console.log('📤 ОТПРАВЛЯЕМ CALCULATE С ДАННЫМИ:', requestData);
        console.log('About to emit calculate event...');

        socket.emit('calculate', requestData);

        console.log('Calculate event emitted successfully'); // Таймаут для запроса (5 минут)
        setTimeout(
          () => {
            cleanup();
            reject(new Error('Превышено время ожидания расчета'));
          },
          5 * 60 * 1000,
        );
      } catch (error) {
        console.error('Failed to get userId or send calculation:', error);
        reject(error);
      }
    };

    // Если socket уже подключен, отправляем сразу
    if (socket.connected) {
      sendCalculation();
    } else {
      // Ожидаем подключения
      socket.once('connect', sendCalculation);

      // Таймаут на подключение
      setTimeout(() => {
        if (!socket.connected) {
          reject(new Error('Не удалось подключиться к серверу'));
        }
      }, 10000);
    }
  });
};

// Функция для получения статуса задачи
export const getCalculationStatus = (jobId: string): Promise<CalculationStatus> => {
  return new Promise((resolve, reject) => {
    const socket = socketService.connect();

    if (!socket.connected) {
      reject(new Error('Socket не подключен'));
      return;
    }

    const token = authTokenUtils.getToken();
    if (!token) {
      reject(new Error('Требуется авторизация'));
      return;
    }

    const statusHandler = (status: CalculationStatus) => {
      if (status.jobId === jobId) {
        socket.off('status', statusHandler);
        resolve(status);
      }
    };

    socket.on('status', statusHandler);
    socket.emit('getStatus', { jobId });

    // Таймаут для запроса статуса
    setTimeout(() => {
      socket.off('status', statusHandler);
      reject(new Error('Превышено время ожидания статуса'));
    }, 30000);
  });
};
