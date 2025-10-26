# Socket.IO интеграция для расчетов орбит

## 🔌 Обзор

Переработанная система использует Socket.IO для real-time коммуникации с бэкендом для выполнения расчетов орбит астрономических объектов.

## 📡 Socket.IO API

### Подключение

```typescript
// Автоматическое подключение с авторизацией
const socket = socketService.connect();

// Авторизация через заголовок
{
  auth: {
    token: `Bearer ${authToken}`;
  }
}
```

### События

#### Исходящие события (клиент → сервер)

##### `calculate` - Запуск расчета

```typescript
socket.emit('calculate', {
  observations: [
    {
      ra_hours: 11,
      dec_degrees: 12,
      timestamp: 1761473781,
    },
    // ... еще наблюдения (минимум 3)
  ],
  authorization: `Bearer ${token}`,
});
```

##### `getHistory` - Получение истории

```typescript
socket.emit('getHistory', {
  authorization: `Bearer ${token}`,
});
```

##### `getStatus` - Проверка статуса задачи

```typescript
socket.emit('getStatus', {
  jobId: '68fdf9e08677e182336390b2',
  authorization: `Bearer ${token}`,
});
```

#### Входящие события (сервер → клиент)

##### `result` - Результат расчета

```typescript
{
  "jobId": "68fdf9e08677e182336390b2",
  "success": true,
  "error": "",
  "semi_major_axis_au": 3.2,
  "eccentricity": 0.65,
  "inclination_deg": 12.5,
  "longitude_ascending_node_deg": 45,
  "argument_perihelion_deg": 80,
  "perihelion_passage_jd": 2460500.5,
  "closest_approach_jd": 2460600.5,
  "closest_distance_au": 0.8
}
```

##### `status` - Обновление статуса

```typescript
{
  "jobId": "68fdfb638677e182336390bb",
  "status": "queued" | "processing" | "completed" | "error"
}
```

##### `error` - Ошибка выполнения

```typescript
{
  "jobId": "68fdf9e08677e182336390b2",
  "error": "Описание ошибки",
  "message": "Дополнительная информация"
}
```

##### `historyList` - Список истории

```typescript
[
  {
    "jobId": "...",
    "status": "completed",
    "created_at": "2025-10-26T14:30:00Z",
    "observations": [...],
    "semi_major_axis_au": 3.2,
    // ... другие результаты
  }
]
```

## 🏗️ Архитектура

### Файловая структура

```
app/
├── shared/
│   ├── services/
│   │   └── socketService.ts           # Сервис управления Socket.IO
│   └── api/
│       ├── calculation/
│       │   └── socketCalculation.ts   # API для расчетов
│       └── history/
│           └── getHistory.ts          # API для истории (Socket.IO)
├── hooks/
│   ├── useCalculation/
│   │   └── index.ts                   # Хук для расчетов
│   └── useGetHistory/
│       └── index.ts                   # Хук для истории
└── components/
    └── CalculationForm/
        └── index.tsx                  # Форма для расчетов
```

### Ключевые компоненты

#### SocketService

- Singleton для управления подключением
- Автоматическое переподключение
- Авторизация через токены

#### useCalculation Hook

```typescript
const {
  isCalculating, // Флаг выполнения расчета
  currentJobId, // ID текущей задачи
  result, // Результат расчета
  status, // Текущий статус
  error, // Ошибки
  progress, // Прогресс (0-100%)
  calculate, // Функция запуска
  resetCalculation, // Сброс состояния
} = useCalculation();
```

#### CalculationForm Component

- Форма ввода наблюдений
- Real-time отображение прогресса
- Валидация данных
- Визуализация результатов

## 🔧 Использование

### Запуск расчета

```typescript
import { useCalculation } from '@/hooks/useCalculation';

const MyComponent = () => {
  const { calculate, isCalculating, result } = useCalculation();

  const handleCalculate = async () => {
    await calculate({
      observations: [
        { ra_hours: 11, dec_degrees: 12, timestamp: 1761473781 },
        { ra_hours: 11, dec_degrees: 12, timestamp: 1761560181 },
        { ra_hours: 11, dec_degrees: 11, timestamp: 1761646581 }
      ]
    });
  };

  return (
    <div>
      <button onClick={handleCalculate} disabled={isCalculating}>
        {isCalculating ? 'Расчет...' : 'Рассчитать'}
      </button>
      {result && <div>Результат: {result.semi_major_axis_au} а.е.</div>}
    </div>
  );
};
```

### Получение истории

```typescript
import { useGetHistory } from '@/hooks/useGetHistory';

const HistoryComponent = () => {
  const { history, isLoading, error, refetch } = useGetHistory();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {history.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
```

## 🛡️ Обработка ошибок

### Уровни fallback

1. **Socket недоступен** → Локальные заглушки
2. **Таймаут запроса** → Ошибка с возможностью повтора
3. **Ошибка авторизации** → Перенаправление на вход
4. **Сетевые проблемы** → Автоматическое переподключение

### Типы ошибок

- Сетевые ошибки подключения
- Ошибки авторизации
- Ошибки валидации данных
- Таймауты запросов
- Ошибки вычислений на сервере

## 🚀 Деплой и настройка

### Переменные окружения

```env
NEXT_PUBLIC_API_URL=http://109.120.190.243:8001
```

### Socket.IO сервер

- URL: `process.env.NEXT_PUBLIC_API_URL`
- Транспорты: WebSocket, Polling
- Авторизация: Bearer токены
- Таймауты: 5 минут для расчетов, 10 секунд для истории

### Зависимости

```json
{
  "socket.io-client": "^4.x.x"
}
```

## 📊 Мониторинг

### Логирование

- Подключение/отключение Socket.IO
- Отправка/получение событий
- Ошибки и таймауты
- Fallback к заглушкам

### Метрики

- Время выполнения расчетов
- Частота ошибок подключения
- Использование fallback данных
- Статистика успешных расчетов
