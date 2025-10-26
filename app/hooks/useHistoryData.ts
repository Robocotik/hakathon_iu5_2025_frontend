import { useState, useEffect } from 'react';

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

export const useHistoryData = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Заглушка для API запроса
  const fetchHistory = async (): Promise<HistoryItem[]> => {
    // TODO: Заменить на реальный API запрос
    // const response = await fetch('/api/user/history', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    //
    // if (!response.ok) {
    //   throw new Error('Failed to fetch history');
    // }
    //
    // return response.json();

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: '1',
        title: 'Расчет орбиты Марса',
        date: '2025-10-26T14:30:00Z',
        type: 'calculation',
        status: 'completed',
        preview: 'Эллиптическая орбита с периодом 687 земных дней',
        details: {
          parameters: {
            'Большая полуось': '227.9 млн км',
            Эксцентриситет: '0.0934',
            Наклонение: '1.85°',
            'Аргумент перигея': '286.5°',
          },
          results: {
            'Орбитальный период': '686.98 дней',
            Афелий: '249.2 млн км',
            Перигелий: '206.6 млн км',
            'Средняя скорость': '24.1 км/с',
          },
          description:
            'Полный расчет орбитальных параметров Марса относительно Солнца с учетом гравитационного влияния других планет',
        },
      },
      {
        id: '2',
        title: 'Наблюдение транзита Венеры',
        date: '2025-10-25T09:15:00Z',
        type: 'observation',
        status: 'completed',
        preview: 'Прохождение Венеры по диску Солнца',
        details: {
          parameters: {
            'Время начала': '09:15 UTC',
            Продолжительность: '6 часов 14 минут',
            Местоположение: 'Москва, Россия',
            Телескоп: 'Рефрактор 150мм',
          },
          results: {
            'Точки контакта': '4 точки зафиксированы',
            'Атмосферный эффект': 'Кольцо наблюдалось',
            'Качество данных': 'Отличное',
            'Снимков сделано': '247 кадров',
          },
          description:
            'Редкое астрономическое явление - транзит Венеры через солнечный диск. Наблюдение проводилось с фильтром для безопасного наблюдения Солнца',
        },
      },
      {
        id: '3',
        title: 'Расчет гравитационных волн',
        date: '2025-10-24T16:45:00Z',
        type: 'calculation',
        status: 'processing',
        preview: 'Моделирование слияния черных дыр',
        details: {
          parameters: {
            'Масса первой ЧД': '30 солнечных масс',
            'Масса второй ЧД': '25 солнечных масс',
            Расстояние: '1.3 млрд световых лет',
            'Время симуляции': '100 мс до слияния',
          },
          results: {
            'Частота пика': 'Расчет в процессе...',
            Амплитуда: 'Определяется...',
            'Chirp масса': '24.2 солнечные массы',
            Прогресс: '67% завершено',
          },
          description:
            'Численное моделирование гравитационных волн от слияния черных дыр с использованием общей теории относительности',
        },
      },
      {
        id: '4',
        title: 'Анализ кривой блеска экзопланеты',
        date: '2025-10-23T22:30:00Z',
        type: 'observation',
        status: 'completed',
        preview: 'Транзит HD 209458 b (Осирис)',
        details: {
          parameters: {
            Звезда: 'HD 209458',
            Планета: 'HD 209458 b',
            'Время наблюдения': '4.2 часа',
            Фотометр: 'CCD камера',
            Фильтр: 'V-band',
          },
          results: {
            'Глубина транзита': '1.5%',
            Период: '3.52 дня',
            'Радиус планеты': '1.38 R_Юпитера',
            Температура: '1130K',
          },
          description:
            'Фотометрическое наблюдение транзита экзопланеты для определения её физических характеристик',
        },
      },
      {
        id: '5',
        title: 'Расчет либрации Луны',
        date: '2025-10-22T11:20:00Z',
        type: 'calculation',
        status: 'error',
        preview: 'Ошибка в вычислениях физической либрации',
        details: {
          parameters: {
            Период: '1 лунный месяц',
            'Наклон оси': '6.68°',
            'Эксцентриситет орбиты': '0.0549',
            Модель: 'DE421 эфемериды',
          },
          results: {
            Ошибка: 'Превышено время вычислений',
            'Последний результат': 'Амплитуда 7.8°',
            Статус: 'Требуется перезапуск',
            'Код ошибки': 'TIMEOUT_ERROR',
          },
          description:
            'Расчет оптической и физической либрации Луны для определения видимых колебаний лунной поверхности',
        },
      },
    ];
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки истории');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const refreshHistory = async () => {
    const data = await fetchHistory();
    setHistory(data);
  };

  return {
    history,
    loading,
    error,
    refreshHistory,
  };
};
