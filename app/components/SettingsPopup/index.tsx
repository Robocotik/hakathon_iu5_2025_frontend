import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  position: {x: number; y: number};
}

export const SettingsPopup: React.FC<SettingsPopupProps> = ({isOpen, onClose, position}) => {
  const router = useRouter();

  const handleLogin = () => {
    // Переход на страницу логина
    router.push('/login');
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
            <Image src='/icons/login.svg' alt='Login icon' width={16} height={16} />
            Войти
          </button>

          <button
            onClick={handleProfile}
            className='w-full px-4 py-3 text-left text-gray-light hover:bg-gray-dark hover:text-white transition-colors duration-200 flex items-center gap-3'>
            <Image src='/icons/profile.svg' alt='Profile icon' width={16} height={16} />
            Профиль
          </button>

          <button
            onClick={handleSettings}
            className='w-full px-4 py-3 text-left text-gray-light hover:bg-gray-dark hover:text-white transition-colors duration-200 flex items-center gap-3'>
            <Image src='/icons/settings.svg' alt='Settings icon' width={16} height={16} />
            Настройки
          </button>
        </div>
      </div>
    </>
  );
};
