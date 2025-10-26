'use client';

import { CalculationForm } from '@/components/CalculationForm';
import { useGetStars } from '../../hooks/useGetStars';
import { useEffect } from 'react';
import { socketService } from '../../shared/services/socketService';

export default function CalculatorPage() {
  const stars = useGetStars();

    // Подключаем Socket.IO при открытии страницы history
  useEffect(() => {
    console.log('Calculator page mounted, connecting to Socket.IO...');
    const socket = socketService.connect();
    
    // Очистка при размонтировании компонента
    return () => {
      console.log('Calculator page unmounted, but keeping socket connected for other pages');
      // Не отключаем socket здесь, так как он может использоваться на других страницах
    };
  }, []);
  
  return (
    <main className='h-full bg-transparent relative overflow-hidden'>
      {/* Floating stars background */}
      <div className='absolute inset-0 pointer-events-none'>
        {stars.slice(0, 15).map((star, i) => (
          <div
            key={i}
            className='absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse'
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div className='relative z-10 h-full p-6'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>Калькулятор орбит</h1>
            <p className='text-gray-300'>
              Введите наблюдения астрономического объекта для расчета орбитальных элементов
            </p>
          </div>

          {/* Calculation Form */}
          <CalculationForm />
        </div>
      </div>
    </main>
  );
}
