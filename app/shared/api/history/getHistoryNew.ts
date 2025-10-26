import { authTokenUtils } from '../../utils/authToken';

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  type: 'calculation' | 'observation';
  status: 'completed' | 'processing' | 'error';
  preview: string;
  details: {
    parameters: Record<string, any>;
    results: Record<string, any>;
    description: string;
  };
}

export interface HistoryResponse {
  success: boolean;
  data: HistoryItem[];
  error?: string;
}

// Тип данных с бэкенда
interface BackendHistoryItem {
  _id: string;
  userId: string;
  status: string;
  observations: Array<{
    ra_hours: number;
    dec_degrees: number;
    timestamp: number;
  }>;
  createdAt: string;
  updatedAt: string;
  argument_perihelion_deg?: number;
  closest_approach_jd?: number;
  closest_distance_au?: number;
  eccentricity?: number;
  error?: string;
  inclination_deg?: number;
  longitude_ascending_node_deg?: number;
  perihelion_passage_jd?: number;
  semi_major_axis_au?: number;
  success?: boolean;
}

export const getHistory = async (): Promise<HistoryResponse> => {
  try {
    const token = authTokenUtils.getToken();
    if (!token) {
      console.warn('Нет токена авторизации, используем заглушку');
      return getMockHistory();
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}calc/list`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return getMockHistory();
    }

    const backendData: BackendHistoryItem[] = await response.json();

    const historyItems: HistoryItem[] = backendData.map((item) => ({
      id: item._id,
      title: `Расчет ${item._id.slice(-6)}`,
      date: item.createdAt,
      type: 'calculation',
      status: mapServerStatus(item.status),
      preview: generatePreview(item),
      details: {
        parameters: extractParameters(item),
        results: extractResults(item),
        description: generateDescription(item),
      },
    }));

    return {
      success: true,
      data: historyItems,
    };
  } catch (error) {
    console.error('Error fetching history:', error);
    return getMockHistory();
  }
};

// Функции-помощники
const mapServerStatus = (status: string): 'completed' | 'processing' | 'error' => {
  switch (status) {
    case 'completed':
    case 'success':
      return 'completed';
    case 'processing':
    case 'queued':
    case 'running':
      return 'processing';
    case 'error':
    case 'failed':
      return 'error';
    default:
      return 'completed';
  }
};

const generatePreview = (item: BackendHistoryItem): string => {
  if (item.semi_major_axis_au) {
    return `Орбита: ${item.semi_major_axis_au.toFixed(2)} а.е., эксцентриситет ${item.eccentricity?.toFixed(3) || 'N/A'}`;
  }
  return 'Расчет орбитальных параметров';
};

const extractParameters = (item: BackendHistoryItem): Record<string, any> => {
  const params: Record<string, any> = {};

  if (item.observations && Array.isArray(item.observations)) {
    params['Количество наблюдений'] = item.observations.length;
    if (item.observations.length > 0) {
      const first = item.observations[0];
      const last = item.observations[item.observations.length - 1];
      params['Период наблюдений'] =
        `${new Date(first.timestamp * 1000).toLocaleDateString()} - ${new Date(last.timestamp * 1000).toLocaleDateString()}`;
    }
  }

  params['Создано'] = new Date(item.createdAt).toLocaleString('ru-RU');
  params['Статус'] = item.status;

  return params;
};

const extractResults = (item: BackendHistoryItem): Record<string, any> => {
  const results: Record<string, any> = {};

  if (item.semi_major_axis_au !== undefined)
    results['Большая полуось'] = `${item.semi_major_axis_au.toFixed(3)} а.е.`;
  if (item.eccentricity !== undefined) results['Эксцентриситет'] = item.eccentricity.toFixed(4);
  if (item.inclination_deg !== undefined)
    results['Наклонение'] = `${item.inclination_deg.toFixed(2)}°`;
  if (item.longitude_ascending_node_deg !== undefined)
    results['Долгота восходящего узла'] = `${item.longitude_ascending_node_deg.toFixed(2)}°`;
  if (item.argument_perihelion_deg !== undefined)
    results['Аргумент перигелия'] = `${item.argument_perihelion_deg.toFixed(2)}°`;
  if (item.closest_distance_au !== undefined)
    results['Минимальное расстояние'] = `${item.closest_distance_au.toFixed(3)} а.е.`;
  if (item.perihelion_passage_jd !== undefined)
    results['Прохождение перигелия'] = `JD ${item.perihelion_passage_jd.toFixed(1)}`;
  if (item.closest_approach_jd !== undefined)
    results['Ближайший подход'] = `JD ${item.closest_approach_jd.toFixed(1)}`;

  if (item.success !== undefined) results['Успешность'] = item.success ? 'Успешно' : 'Ошибка';
  if (item.error) results['Ошибка'] = item.error;

  return results;
};

const generateDescription = (item: BackendHistoryItem): string => {
  if (item.observations && Array.isArray(item.observations)) {
    const statusText = item.status === 'completed' ? 'завершен' : 'в процессе';
    return `Расчет орбитальных элементов на основе ${item.observations.length} наблюдений астрономического объекта. Расчет ${statusText} ${new Date(item.createdAt).toLocaleString('ru-RU')}.`;
  }
  return 'Расчет орбитальных параметров астрономического объекта';
};

// Заглушка для fallback
const getMockHistory = (): HistoryResponse => {
  return {
    success: true,
    data: [
      {
        id: '1',
        title: 'Расчет орбиты астероида',
        date: '2025-10-26T14:30:00Z',
        type: 'calculation',
        status: 'completed',
        preview: 'Орбита: 3.20 а.е., эксцентриситет 0.650',
        details: {
          parameters: {
            'Количество наблюдений': '5',
            'Период наблюдений': '10.10.2025 - 17.10.2025',
          },
          results: {
            'Большая полуось': '3.200 а.е.',
            Эксцентриситет: '0.6500',
            Наклонение: '12.50°',
            'Минимальное расстояние': '0.800 а.е.',
          },
          description:
            'Расчет орбитальных элементов на основе 5 наблюдений астрономического объекта',
        },
      },
    ],
  };
};
