# Исправления Socket.IO подключения

## 🔧 Проблема

Ошибка "Invalid namespace" при подключении к Socket.IO серверу - клиент пытался подключиться к корневому namespace, а сервер работает на `/api/calc`.

## ✅ Исправления

### 1. SocketService.ts

- **Исправлен namespace**: Подключение к `/api/calc` вместо корневого
- **Исправлена авторизация**: Перенесена в `extraHeaders` вместо `auth`

```typescript
// Было:
this.socket = io('http://localhost:8001', { auth: { token: `Bearer ${token}` } });

// Стало:
this.socket = io('http://localhost:8001/api/calc', {
  extraHeaders: { Authorization: `Bearer ${token}` },
});
```

### 2. Socket API функции

- **Упрощен формат данных**: Отправляем только `{ observations: [...] }`
- **Убрана авторизация из payload**: Авторизация передается через headers подключения
- **Убран requestId**: Не требуется для API

```typescript
// Было:
socket.emit('calculate', {
  observations: [...],
  requestId: '123',
  authorization: 'Bearer ...'
});

// Стало:
socket.emit('calculate', { observations: [...] });
```

### 3. Новые страницы

- **Калькулятор** (`/calculator`): Страница с формой для расчетов
- **Навигация**: Добавлены ссылки "Калькулятор" и "История" в Header

## 🚀 Структура событий Socket.IO

### Отправляемые события:

- `calculate` - Запуск расчета орбиты
- `getHistory` - Получение истории расчетов
- `getStatus` - Проверка статуса задачи

### Получаемые события:

- `result` - Результат расчета
- `status` - Обновление статуса (queued → processing → completed)
- `error` - Ошибки выполнения
- `historyList` - Список истории

## 📊 Тестирование

Для тестирования:

1. Авторизуйтесь в приложении
2. Перейдите на `/calculator`
3. Заполните минимум 3 наблюдения
4. Нажмите "Рассчитать орбиту"
5. Наблюдайте real-time обновления статуса

## 🔗 Совместимость

Код совместим с форматом данных, показанным в скриншотах:

- Namespace: `/calc`
- Авторизация: `Bearer token` в Headers
- Формат наблюдений: `{ra_hours, dec_degrees, timestamp}`
- События: `result`, `status`, `error` как в документации
