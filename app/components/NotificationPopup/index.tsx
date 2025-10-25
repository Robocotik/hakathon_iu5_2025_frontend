import React from 'react';
import { notificationsUsecase } from './NotificationPopup.usecase';

interface NotificationPopupProps {
  isVisible: boolean;
  position: {x: number; y: number};
  onClose: () => void;
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  isVisible,
  position,
  onClose,
}) => {
  // Примеры уведомлений о измерениях
  

  const getIconForType = (type: string) => {
    switch (type) {
      case 'measurement':
        return (
          <svg
            className='w-4 h-4 text-blue-light'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className='w-4 h-4 text-gray-light'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        );
      default:
        return (
          <svg
            className='w-4 h-4 text-yellow-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        );
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
            <svg
              className='w-5 h-5 text-blue-light'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 17h5l-5 5v-5zM4 19h5v-5l-5 5z'
              />
            </svg>
            <h3 className='text-sm font-medium text-gray-light'>Уведомления</h3>
            <span className='ml-auto text-xs bg-blue-light text-black rounded-full px-2 py-1'>
              {notificationsUsecase.length}
            </span>
          </div>
        </div>

        {/* Список уведомлений */}
        <div className='max-h-64 overflow-y-auto'>
          {notificationsUsecase.length > 0 ? (
            notificationsUsecase.map(notification => (
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
                <svg
                  className='w-8 h-8 mx-auto mb-2 text-gray-text/50'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                  />
                </svg>
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
