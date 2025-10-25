import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '../Icon';
import { authTokenUtils } from '../../shared/utils/authToken';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  isLoggedIn: boolean;
}

export const SettingsPopup: React.FC<SettingsPopupProps> = ({
  isOpen,
  onClose,
  position,
  isLoggedIn,
}) => {
  const router = useRouter();

  const handleLogin = () => {
    if (isLoggedIn) {
      // Выходим из аккаунта
      console.log('Logging out user');
      authTokenUtils.removeToken();
      console.log('Token after logout:', authTokenUtils.getToken());
      // Перезагружаем страницу для обновления состояния
      window.location.reload();
    } else {
      // Переход на страницу логина
      router.push('/login');
    }
    onClose();
  };

  const handleSettings = () => {
    // Логика для настроек
    console.log('Settings clicked');
    onClose();
  };

  const handleProfile = () => {
    // Логика для профиля
    console.log('Profile clicked');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay для закрытия popup при клике вне его */}
      <div className='fixed inset-0 z-40' onClick={onClose} />

      {/* Popup */}
      <div
        className='fixed z-50 bg-gray border border-gray-light rounded-lg shadow-lg overflow-hidden min-w-48 animate-popup'
        style={{
          left: position.x - 180, // Сдвигаем влево, чтобы popup был справа от иконки
          top: position.y + 10, // Немного ниже иконки
        }}>
        {/* Заголовок */}
        <div className='px-4 py-3 border-b border-gray-light bg-gray-dark'>
          <h3 className='text-sm font-medium text-gray-light'>Настройки</h3>
        </div>

        {/* Список действий */}
        <div className='py-2'>
          <button
            onClick={handleLogin}
            className='w-full px-4 py-3 text-left text-gray-light hover:bg-gray-dark hover:text-white transition-colors duration-200 flex items-center gap-3'>
            <Icon name='login' className='text-gray-light' size={16} />
            {isLoggedIn ? 'Выйти' : 'Войти'}
          </button>

          <button
            onClick={handleProfile}
            className='w-full px-4 py-3 text-left text-gray-light hover:bg-gray-dark hover:text-white transition-colors duration-200 flex items-center gap-3'>
            <Icon name='profile' className='text-gray-light' size={16} />
            Профиль
          </button>

          <button
            onClick={handleSettings}
            className='w-full px-4 py-3 text-left text-gray-light hover:bg-gray-dark hover:text-white transition-colors duration-200 flex items-center gap-3'>
            <Icon name='settings' className='text-gray-light' size={16} />
            Настройки
          </button>
        </div>
      </div>
    </>
  );
};
