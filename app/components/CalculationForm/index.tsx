'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { useCalculation } from '../../hooks/useCalculation';
import type { Observation } from '../../shared/api/calculation/socketCalculation';

export const CalculationForm = () => {
  const [observations, setObservations] = useState<Observation[]>([
    { ra_hours: 11, dec_degrees: 12, timestamp: Math.floor(Date.now() / 1000) },
  ]);

  const { isCalculating, result, status, error, progress, calculate, resetCalculation } =
    useCalculation();

  const addObservation = () => {
    setObservations((prev) => [
      ...prev,
      {
        ra_hours: 0,
        dec_degrees: 0,
        timestamp: Math.floor(Date.now() / 1000),
      },
    ]);
  };

  const removeObservation = (index: number) => {
    setObservations((prev) => prev.filter((_, i) => i !== index));
  };

  const updateObservation = (index: number, field: keyof Observation, value: number) => {
    setObservations((prev) =>
      prev.map((obs, i) => (i === index ? { ...obs, [field]: value } : obs)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (observations.length < 3) {
      alert('Необходимо минимум 3 наблюдения для расчета орбиты');
      return;
    }

    await calculate({ observations });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('ru-RU');
  };

  return (
    <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
      <h2 className='text-2xl font-bold text-white mb-6'>Расчет орбиты</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Список наблюдений */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <label className='text-lg font-semibold text-white'>
              Наблюдения ({observations.length})
            </label>
            <button
              type='button'
              onClick={addObservation}
              className='px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors flex items-center space-x-2'>
              <Icon name='plus' className='w-4 h-4' />
              <span>Добавить</span>
            </button>
          </div>

          <div className='space-y-3 max-h-96 overflow-y-auto'>
            {observations.map((obs, index) => (
              <div
                key={index}
                className='bg-white/5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
                <div>
                  <label className='block text-sm text-gray-300 mb-1'>
                    Прямое восхождение (часы)
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    min='0'
                    max='24'
                    value={obs.ra_hours}
                    onChange={(e) =>
                      updateObservation(index, 'ra_hours', parseFloat(e.target.value) || 0)
                    }
                    className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none'
                  />
                </div>

                <div>
                  <label className='block text-sm text-gray-300 mb-1'>Склонение (градусы)</label>
                  <input
                    type='number'
                    step='0.01'
                    min='-90'
                    max='90'
                    value={obs.dec_degrees}
                    onChange={(e) =>
                      updateObservation(index, 'dec_degrees', parseFloat(e.target.value) || 0)
                    }
                    className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none'
                  />
                </div>

                <div>
                  <label className='block text-sm text-gray-300 mb-1'>Время наблюдения</label>
                  <input
                    type='datetime-local'
                    value={new Date(obs.timestamp * 1000).toISOString().slice(0, 16)}
                    onChange={(e) => {
                      const timestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
                      updateObservation(index, 'timestamp', timestamp);
                    }}
                    className='w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none'
                  />
                </div>

                <div className='flex space-x-2'>
                  {observations.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeObservation(index)}
                      className='px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors'>
                      <Icon name='x' className='w-4 h-4' />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки */}
        <div className='flex space-x-4'>
          <button
            type='submit'
            disabled={isCalculating || observations.length < 3}
            className='flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold'>
            {isCalculating ? 'Расчет...' : 'Рассчитать орбиту'}
          </button>

          {(result || error) && (
            <button
              type='button'
              onClick={resetCalculation}
              className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors'>
              Сброс
            </button>
          )}
        </div>
      </form>

      {/* Прогресс */}
      {isCalculating && (
        <div className='mt-6 space-y-3'>
          <div className='flex items-center justify-between text-sm text-gray-300'>
            <span>Прогресс расчета</span>
            <span>{progress}%</span>
          </div>
          <div className='w-full bg-white/10 rounded-full h-2'>
            <div
              className='bg-blue-500 h-2 rounded-full transition-all duration-500'
              style={{ width: `${progress}%` }}></div>
          </div>
          {status && (
            <p className='text-sm text-gray-300'>Статус: {getStatusText(status.status)}</p>
          )}
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className='mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg'>
          <div className='flex items-center space-x-2 text-red-400'>
            <Icon name='info' className='w-5 h-5' />
            <span className='font-semibold'>Ошибка</span>
          </div>
          <p className='text-red-300 mt-1'>{error}</p>
        </div>
      )}

      {/* Результат */}
      {result && (
        <div className='mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg'>
          <div className='flex items-center space-x-2 text-green-400 mb-3'>
            <Icon name='check-circle' className='w-5 h-5' />
            <span className='font-semibold'>Расчет завершен</span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
            <div>
              <p className='text-gray-300'>Большая полуось:</p>
              <p className='text-white font-medium'>{result.semi_major_axis_au.toFixed(3)} а.е.</p>
            </div>
            <div>
              <p className='text-gray-300'>Эксцентриситет:</p>
              <p className='text-white font-medium'>{result.eccentricity.toFixed(4)}</p>
            </div>
            <div>
              <p className='text-gray-300'>Наклонение:</p>
              <p className='text-white font-medium'>{result.inclination_deg.toFixed(2)}°</p>
            </div>
            <div>
              <p className='text-gray-300'>Минимальное расстояние:</p>
              <p className='text-white font-medium'>{result.closest_distance_au.toFixed(3)} а.е.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Функция для отображения статуса
const getStatusText = (status: string): string => {
  switch (status) {
    case 'queued':
      return 'В очереди';
    case 'processing':
      return 'Обработка';
    case 'completed':
      return 'Завершено';
    case 'error':
      return 'Ошибка';
    default:
      return status;
  }
};
