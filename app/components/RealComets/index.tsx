'use client';
import React, { useEffect, useState } from 'react';
import { useGetHistory } from '../../hooks/useGetHistory';

interface RealCometProps {
  planetSize: number;
  cometData: {
    id: string;
    title: string;
    date: string;
    details: {
      results: Record<string, any>;
    };
  };
  index: number;
}

const RealComet: React.FC<RealCometProps> = ({ planetSize, cometData, index }) => {
  const [angle, setAngle] = useState(index * (Math.PI / 4)); // Начальные позиции разные

  // Извлекаем орбитальные параметры из результатов
  const results = cometData.details.results;
  const semiMajorAxis =
    parseFloat(results['Большая полуось']?.replace(' а.е.', '')) || 1.5 + index * 0.3;
  const eccentricity = parseFloat(results['Эксцентриситет']) || 0.1 + index * 0.15;
  const inclination = parseFloat(results['Наклонение']?.replace('°', '')) || 5 + index * 10;
  const minDistance =
    parseFloat(results['Минимальное расстояние']?.replace(' а.е.', '')) ||
    semiMajorAxis * (1 - eccentricity);

  // Масштабируем для отображения
  const scaledMajorAxis = planetSize * semiMajorAxis * 0.8;
  const scaledMinorAxis = scaledMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);
  const focalDistance = scaledMajorAxis * eccentricity;

  // Цвета для разных комет
  const colors = [
    'from-blue-400 to-cyan-300',
    'from-purple-400 to-pink-300',
    'from-green-400 to-emerald-300',
    'from-yellow-400 to-orange-300',
    'from-red-400 to-rose-300',
    'from-indigo-400 to-violet-300',
  ];
  const cometColor = colors[index % colors.length];

  useEffect(() => {
    const speed = 0.01 + (1 / semiMajorAxis) * 0.005; // Более далекие кометы движутся медленнее
    const interval = setInterval(() => {
      setAngle((prev) => (prev + speed) % (2 * Math.PI));
    }, 50);

    return () => clearInterval(interval);
  }, [semiMajorAxis]);

  // Вычисляем позицию кометы
  const cometX = scaledMajorAxis * Math.cos(angle) - focalDistance;
  const cometY = scaledMinorAxis * Math.sin(angle);

  // Применяем наклонение орбиты
  const rotatedX =
    cometX * Math.cos((inclination * Math.PI) / 180) -
    cometY * Math.sin((inclination * Math.PI) / 180);
  const rotatedY =
    cometX * Math.sin((inclination * Math.PI) / 180) +
    cometY * Math.cos((inclination * Math.PI) / 180);

  const distanceToEarth = Math.sqrt(rotatedX * rotatedX + rotatedY * rotatedY);

  return (
    <>
      {/* Орбитальная траектория */}
      <div className='absolute inset-0 pointer-events-none'>
        <svg
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          width={scaledMajorAxis * 2 + 100}
          height={scaledMinorAxis * 2 + 100}
          style={{ overflow: 'visible' }}>
          <ellipse
            cx={scaledMajorAxis + 50 + focalDistance}
            cy={scaledMinorAxis + 50}
            rx={scaledMajorAxis}
            ry={scaledMinorAxis}
            fill='none'
            stroke={`rgba(${index === 0 ? '59, 130, 246' : index === 1 ? '168, 85, 247' : index === 2 ? '34, 197, 94' : '234, 179, 8'}, 0.3)`}
            strokeWidth='1'
            strokeDasharray='3,3'
            transform={`rotate(${inclination}, ${scaledMajorAxis + 50 + focalDistance}, ${scaledMinorAxis + 50})`}
          />
        </svg>
      </div>

      {/* Комета */}
      <div
        className='absolute w-2 h-2 pointer-events-none transition-all duration-100'
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${rotatedX}px, ${rotatedY}px)`,
        }}>
        {/* Ядро кометы */}
        <div
          className={`w-2 h-2 bg-gradient-to-r ${cometColor} rounded-full shadow-lg animate-pulse`}
        />

        {/* Хвост кометы */}
        <div
          className={`absolute w-8 h-0.5 bg-gradient-to-r ${cometColor} to-transparent opacity-70`}
          style={{
            left: '-8px',
            top: '50%',
            transform: `translateY(-50%) rotate(${(angle * 180) / Math.PI + 180}deg)`,
            transformOrigin: 'right center',
          }}
        />
      </div>

      {/* Информация о комете при наведении */}
      <div
        className='absolute pointer-events-none text-xs text-white bg-black/70 rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity'
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${rotatedX + 20}px, ${rotatedY - 20}px)`,
        }}>
        <div className='whitespace-nowrap'>
          <div className='font-semibold'>{cometData.title}</div>
          <div>Расстояние: {Math.round(distanceToEarth / 10)} км</div>
          <div>Эксцентр.: {eccentricity.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
};

interface RealCometsProps {
  planetSize: number;
  className?: string;
}

export const RealComets: React.FC<RealCometsProps> = ({ planetSize, className = '' }) => {
  const { history, isLoading, error } = useGetHistory();
  const [selectedComet, setSelectedComet] = useState<number | null>(null);

  // Фильтруем только завершенные расчеты с результатами
  const completedComets = history
    .filter(
      (item) =>
        item.status === 'completed' &&
        item.details?.results &&
        Object.keys(item.details.results).length > 0,
    )
    .slice(0, 6); // Ограничиваем до 6 комет

  if (isLoading) {
    return (
      <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4 text-white'>
        <div className='text-sm'>Загрузка комет...</div>
      </div>
    );
  }

  if (error || completedComets.length === 0) {
    return (
      <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4 text-white'>
        <div className='text-sm text-gray-400'>Нет данных о кометах</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Отображаем все кометы */}
      {completedComets.map((cometData, index) => (
        <RealComet key={cometData.id} planetSize={planetSize} cometData={cometData} index={index} />
      ))}

      {/* Панель информации */}
      <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4 text-white max-w-xs'>
        <h3 className='text-sm font-semibold text-blue-300 mb-2'>
          Реальные кометы ({completedComets.length})
        </h3>
        <div className='space-y-2 text-xs max-h-40 overflow-y-auto'>
          {completedComets.map((comet, index) => {
            const results = comet.details.results;
            const semiMajorAxis =
              parseFloat(results['Большая полуось']?.replace(' а.е.', '')) || 'N/A';
            const eccentricity = parseFloat(results['Эксцентриситет']) || 'N/A';

            return (
              <div
                key={comet.id}
                className={`p-2 rounded border-l-2 cursor-pointer transition-colors ${
                  index === 0
                    ? 'border-blue-400 bg-blue-900/20'
                    : index === 1
                      ? 'border-purple-400 bg-purple-900/20'
                      : index === 2
                        ? 'border-green-400 bg-green-900/20'
                        : 'border-yellow-400 bg-yellow-900/20'
                }`}
                onMouseEnter={() => setSelectedComet(index)}
                onMouseLeave={() => setSelectedComet(null)}>
                <div className='font-medium truncate'>{comet.title}</div>
                <div className='text-gray-300'>
                  a: {typeof semiMajorAxis === 'number' ? semiMajorAxis.toFixed(2) : semiMajorAxis}{' '}
                  а.е.
                </div>
                <div className='text-gray-300'>
                  e: {typeof eccentricity === 'number' ? eccentricity.toFixed(3) : eccentricity}
                </div>
              </div>
            );
          })}
        </div>

        {completedComets.length > 0 && (
          <div className='mt-3 pt-2 border-t border-gray-600 text-xs text-gray-400'>
            Данные получены из истории расчетов
          </div>
        )}
      </div>
    </div>
  );
};
