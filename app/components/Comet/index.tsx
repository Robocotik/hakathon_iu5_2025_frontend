'use client';
import React, { useEffect, useState } from 'react';

interface CometProps {
  planetSize: number;
  className?: string;
}

export const Comet: React.FC<CometProps> = ({ planetSize, className = '' }) => {
  const [angle, setAngle] = useState(0);
  const [minDistance, setMinDistance] = useState<number | null>(null);

  // Параметры эллиптической орбиты
  const semiMajorAxis = planetSize * 1.8; // большая полуось
  const eccentricity = 0.6; // эксцентриситет (0.6 - довольно вытянутая орбита)
  const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);

  // Центр планеты (Earth) находится в одном из фокусов эллипса
  const focalDistance = semiMajorAxis * eccentricity;

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.02) % (2 * Math.PI)); // Скорость вращения
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Вычисляем позицию кометы на эллипсе
  const cometX = semiMajorAxis * Math.cos(angle) - focalDistance;
  const cometY = semiMinorAxis * Math.sin(angle);

  // Вычисляем расстояние от кометы до центра Земли
  const distanceToEarth = Math.sqrt(cometX * cometX + cometY * cometY);

  // Вычисляем минимальное расстояние (перигелий)
  const calculatedMinDistance = semiMajorAxis * (1 - eccentricity) - planetSize / 2;

  useEffect(() => {
    if (minDistance === null || distanceToEarth < minDistance) {
      setMinDistance(Math.round(calculatedMinDistance));
    }
  }, [distanceToEarth, calculatedMinDistance, minDistance]);

  return (
    <>
      {/* Орбитальная траектория (эллипс) */}
      <div className='absolute inset-0 pointer-events-none'>
        <svg
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          width={semiMajorAxis * 2 + 100}
          height={semiMinorAxis * 2 + 100}
          style={{ overflow: 'visible' }}>
          <ellipse
            cx={semiMajorAxis + 50 + focalDistance}
            cy={semiMinorAxis + 50}
            rx={semiMajorAxis}
            ry={semiMinorAxis}
            fill='none'
            stroke='rgba(255, 255, 255, 0.2)'
            strokeWidth='1'
            strokeDasharray='5,5'
          />
        </svg>
      </div>

      {/* Комета */}
      <div
        className={`absolute w-3 h-3 pointer-events-none transition-all duration-100 ${className}`}
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${cometX}px, ${cometY}px)`,
        }}>
        {/* Ядро кометы */}
        <div className='w-3 h-3 bg-gradient-to-r from-blue-400 to-white rounded-full shadow-lg animate-pulse' />

        {/* Хвост кометы */}
        <div
          className='absolute w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent opacity-70'
          style={{
            left: '-12px',
            top: '50%',
            transform: `translateY(-50%) rotate(${(angle * 180) / Math.PI + 180}deg)`,
            transformOrigin: 'right center',
          }}
        />
      </div>

      {/* Отображение минимального расстояния */}
      {minDistance !== null && (
        <div className='absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-lg p-4 text-white'>
          <h3 className='text-sm font-semibold text-blue-300 mb-2'>Орбитальные данные</h3>
          <div className='space-y-1 text-xs'>
            <div>
              <span className='text-gray-300'>Минимальное расстояние:</span>
              <span className='text-yellow-400 ml-2 font-mono'>{minDistance} км</span>
            </div>
            <div>
              <span className='text-gray-300'>Текущее расстояние:</span>
              <span className='text-blue-400 ml-2 font-mono'>{Math.round(distanceToEarth)} км</span>
            </div>
            <div>
              <span className='text-gray-300'>Эксцентриситет:</span>
              <span className='text-green-400 ml-2 font-mono'>{eccentricity.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Линия минимального расстояния */}
      {angle > Math.PI * 1.8 && angle < Math.PI * 2.2 && (
        <div className='absolute inset-0 pointer-events-none'>
          <svg
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            width='100%'
            height='100%'
            style={{ overflow: 'visible' }}>
            <line
              x1='0'
              y1='0'
              x2={cometX}
              y2={cometY}
              stroke='rgba(255, 255, 0, 0.8)'
              strokeWidth='2'
              strokeDasharray='3,3'
            />
            <text
              x={cometX / 2}
              y={cometY / 2 - 10}
              fill='yellow'
              fontSize='12'
              textAnchor='middle'
              className='font-mono'>
              {Math.round(distanceToEarth)} км
            </text>
          </svg>
        </div>
      )}
    </>
  );
};
