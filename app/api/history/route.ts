import { NextRequest, NextResponse } from 'next/server';

// Заглушка данных для API
const mockHistoryData = [
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
];

export async function GET(request: NextRequest) {
  try {
    // Симуляция задержки
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Здесь будет реальная логика получения истории пользователя
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // if (!token) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // const userId = validateToken(token);
    // const history = await getUserHistory(userId);

    return NextResponse.json({
      success: true,
      data: mockHistoryData,
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Ошибка получения истории' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Здесь будет логика создания нового расчета/наблюдения
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // const userId = validateToken(token);
    // const newItem = await createHistoryItem(userId, body);

    const newItem = {
      id: Date.now().toString(),
      title: body.title || 'Новый расчет',
      date: new Date().toISOString(),
      type: body.type || 'calculation',
      status: 'processing',
      preview: body.preview || 'Расчет в процессе...',
      details: body.details || {},
    };

    return NextResponse.json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating history item:', error);
    return NextResponse.json({ error: 'Ошибка создания записи' }, { status: 500 });
  }
}
