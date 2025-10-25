import React from 'react';
import { notificationsUsecase } from './NotificationPopup.usecase';
import { Icon } from '../Icon';

interface NotificationPopupProps {
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  isVisible,
  position,
  onClose,
}) => {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'measurement':
        return <Icon name='activity' className='text-gray-light' size={16} />;
      case 'info':
        return <Icon name='info' className='text-gray-light' size={16} />;
      default:
        return <Icon name='notification' className='text-yellow-400' size={16} />;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay для закрытия popup при клике вне его */}
      <div className='fixed inset-0 z-40' onClick={onClose} />

      <div
        className='fixed z-50 bg-gray border border-gray-light rounded-lg shadow-lg overflow-hidden w-80 animate-popup'
        style={{
          left: position.x - 300, // Сдвигаем влево от иконки
          top: position.y + 10, // Немного ниже иконки
        }}>
        {/* Заголовок */}
        <div className='px-4 py-3 border-b border-gray-light bg-gray-dark'>
          <div className='flex items-center gap-2'>
            <Icon name='notification' className='text-blue-light' size={20} />
            <h3 className='text-sm font-medium text-gray-light'>Уведомления</h3>
            <span className='ml-auto text-xs bg-blue-light text-black rounded-full px-2 py-1'>
              {notificationsUsecase.length}
            </span>
          </div>
        </div>

        {/* Список уведомлений */}
        <div className='max-h-64 overflow-y-auto'>
          {notificationsUsecase.length > 0 ? (
            notificationsUsecase.map((notification) => (
              <div
                key={notification.id}
                className='px-4 py-3 border-b border-gray-light/30 hover:bg-gray-dark/50 transition-colors duration-200 cursor-pointer'>
                <div className='flex items-start gap-3'>
                  <div className='shrink-0 mt-1'>{getIconForType(notification.type)}</div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-light truncate'>
                      {notification.title}
                    </p>
                    <p className='text-xs text-gray-text mt-1 line-clamp-2'>
                      {notification.message}
                    </p>
                    <p className='text-xs text-gray-text/70 mt-2'>{notification.time}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='px-4 py-6 text-center'>
              <div className='text-gray-text text-sm'>
                <Icon name='info' className='mx-auto mb-2 text-gray-text/50' size={32} />
                Нет новых уведомлений
              </div>
            </div>
          )}
        </div>

        {/* Футер */}
        <div className='px-4 py-3 bg-gray-dark border-t border-gray-light'>
          <button className='w-full text-xs text-blue-light hover:text-white transition-colors duration-200'>
            Посмотреть все уведомления
          </button>
        </div>
      </div>
    </>
  );
};
