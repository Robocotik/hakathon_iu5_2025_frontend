interface NotificationData {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'measurement' | 'info' | 'warning';
}

export const notificationsUsecase: NotificationData[] = [
  {
    id: '1',
    title: 'Измерение завершено',
    message: 'Расчет траектории спутника выполнен успешно',
    time: '2 мин назад',
    type: 'measurement',
  },
  {
    id: '2',
    title: 'Новое измерение',
    message: 'Начато измерение орбитальных параметров',
    time: '15 мин назад',
    type: 'measurement',
  },
  {
    id: '3',
    title: 'Данные обновлены',
    message: 'Получены новые телеметрические данные',
    time: '1 час назад',
    type: 'info',
  },
];
