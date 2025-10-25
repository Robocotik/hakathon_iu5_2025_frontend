'use client';

import Link from 'next/link';
import type {FC} from 'react';
import {Props} from './Header.props';
import {SettingsPopup} from '../SettingsPopup';
import {NotificationPopup} from '../NotificationPopup';
import {useState, useRef} from 'react';
import {Icon} from '../Icon';
import Image from 'next/image';

export const Header: FC<Props> = () => {
  const isLoggedIn = false;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({x: 0, y: 0});
  const [notificationPosition, setNotificationPosition] = useState({x: 0, y: 0});
  const settingsRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleSettingsClick = (event: React.MouseEvent) => {
    console.log('Settings clicked!'); // Для отладки
    event.stopPropagation();
    if (settingsRef.current) {
      const rect = settingsRef.current.getBoundingClientRect();
      setPopupPosition({
        x: rect.right,
        y: rect.bottom,
      });
    }
    setIsSettingsOpen(!isSettingsOpen);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleNotificationClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (notificationRef.current) {
      const rect = notificationRef.current.getBoundingClientRect();
      setNotificationPosition({
        x: rect.right,
        y: rect.bottom,
      });
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };
  return (
    <header className='w-full flex items-center justify-between p-4 bg-transparent relative z-50'>
      <Link
        href='/'
        className='h-18 w-32 cursor-pointer shadow-2xl hover:shadow-white/15 hover:shadow-md transition-shadow duration-300 relative z-10'>
        <Image
          className='h-full w-full pointer-events-none'
          src='/icons/logo.svg'
          alt='Logo'
          width={100}
          height={100}
        />
      </Link>

      <nav className='flex gap-4 items-center'>
        <Link
          className='text-gray-text hover:text-gray-light transition-colors duration-200 relative group hover:tw-shadow-glow-blue'
          href='/'>
          Home
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-light transition-all duration-300 group-hover:w-full group-hover:shadow-glow-underline'></span>
        </Link>
        <Link
          className='text-gray-text hover:text-gray-light transition-colors duration-200 relative group  hover:shadow-glow-blue'
          href='/calculation'>
          Calculation
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-light transition-all duration-300 group-hover:w-full group-hover:shadow-glow-underline'></span>
        </Link>
        <Link
          className='text-gray-text hover:text-gray-light transition-colors duration-200 relative group hover:shadow-glow-blue'
          href='/about'>
          About
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-light transition-all duration-300 group-hover:w-full group-hover:shadow-glow-underline'></span>
        </Link>
      </nav>

      <div className='flex gap-4 items-center relative z-10'>
        <div
          ref={settingsRef}
          onClick={handleSettingsClick}
          className='rounded-full p-3 transition-all duration-200 bg-gray w-12 h-12 cursor-pointer hover:shadow-xs hover:shadow-white/70 flex items-center justify-center relative z-10'>
          <Icon name='settings' className='text-gray-text' size={24} />
        </div>
        <div
          ref={notificationRef}
          onClick={handleNotificationClick}
          className='rounded-full p-3 transition-all duration-200 bg-gray w-12 h-12 cursor-pointer hover:shadow-xs hover:shadow-white/70 relative flex items-center justify-center z-10'>
          <Icon name='notification' className='text-gray-text' size={24} />
          {/* Индикатор новых уведомлений */}
          <div className='absolute -top-1 -right-1 w-3 h-3 bg-blue-light rounded-full border-2 border-black'></div>
        </div>
        {isLoggedIn ? (
          <div className='rounded-full p-3 transition-all duration-200 bg-gray w-12 h-12 cursor-pointer hover:shadow-xs hover:shadow-white/70 flex items-center justify-center relative z-10'>
            <Icon name='emptyUser' className='text-gray-text' size={24} />
          </div>
        ) : (
          <div className='rounded-full p-3 transition-all duration-200 bg-gray w-12 h-12 cursor-pointer hover:shadow-xs hover:shadow-white/70 flex items-center justify-center relative z-10'>
            <Icon name='emptyUser' className='text-gray-text' size={24} />
          </div>
        )}
      </div>

      {/* Settings Popup */}
      <SettingsPopup isOpen={isSettingsOpen} onClose={closeSettings} position={popupPosition} />

      {/* Notification Popup */}
      <NotificationPopup
        isVisible={isNotificationOpen}
        onClose={closeNotifications}
        position={notificationPosition}
      />
    </header>
  );
};
