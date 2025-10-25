import React from 'react';

interface PlanetProps {
  size?: number;
  className?: string;
}

export const Planet: React.FC<PlanetProps> = ({ size = 300, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox='0 0 300 300'
        className='animate-spin-slow'
        style={{ animationDuration: '60s' }}>
        {/* Gradient definitions */}
        <defs>
          {/* Planet gradient */}
          <radialGradient id='planetGradient' cx='0.3' cy='0.3'>
            <stop offset='0%' stopColor='#4a90e2' />
            <stop offset='30%' stopColor='#357abd' />
            <stop offset='70%' stopColor='#1e4a72' />
            <stop offset='100%' stopColor='#0d1b2a' />
          </radialGradient>

          {/* Atmosphere glow */}
          <radialGradient id='atmosphereGradient' cx='0.5' cy='0.5'>
            <stop offset='60%' stopColor='transparent' />
            <stop offset='80%' stopColor='rgba(106, 141, 179, 0.3)' />
            <stop offset='90%' stopColor='rgba(106, 141, 179, 0.6)' />
            <stop offset='100%' stopColor='rgba(106, 141, 179, 0.8)' />
          </radialGradient>

          {/* Ring gradient */}
          <linearGradient id='ringGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='rgba(106, 141, 179, 0.1)' />
            <stop offset='50%' stopColor='rgba(106, 141, 179, 0.6)' />
            <stop offset='100%' stopColor='rgba(106, 141, 179, 0.1)' />
          </linearGradient>

          {/* Network pattern */}
          <pattern
            id='networkPattern'
            x='0'
            y='0'
            width='20'
            height='20'
            patternUnits='userSpaceOnUse'>
            <circle cx='10' cy='10' r='1' fill='rgba(106, 141, 179, 0.4)' />
            <line
              x1='10'
              y1='10'
              x2='20'
              y2='10'
              stroke='rgba(106, 141, 179, 0.2)'
              strokeWidth='0.5'
            />
            <line
              x1='10'
              y1='10'
              x2='10'
              y2='20'
              stroke='rgba(106, 141, 179, 0.2)'
              strokeWidth='0.5'
            />
          </pattern>
        </defs>

        {/* Outer atmosphere glow */}
        <circle cx='150' cy='150' r='140' fill='url(#atmosphereGradient)' opacity='0.7' />

        {/* Planet rings (behind) */}
        <ellipse
          cx='150'
          cy='150'
          rx='120'
          ry='30'
          fill='none'
          stroke='url(#ringGradient)'
          strokeWidth='2'
          opacity='0.6'
          transform='rotate(-20 150 150)'
        />
        <ellipse
          cx='150'
          cy='150'
          rx='130'
          ry='32'
          fill='none'
          stroke='url(#ringGradient)'
          strokeWidth='1'
          opacity='0.4'
          transform='rotate(-20 150 150)'
        />

        {/* Main planet body */}
        <circle cx='150' cy='150' r='80' fill='url(#planetGradient)' />

        {/* Network overlay on planet */}
        <circle cx='150' cy='150' r='80' fill='url(#networkPattern)' opacity='0.6' />

        {/* Continent-like patterns */}
        <path
          d='M120 130 Q140 120, 160 130 Q170 140, 160 150 Q140 145, 120 150 Z'
          fill='rgba(106, 141, 179, 0.8)'
          opacity='0.7'
        />
        <path
          d='M130 170 Q150 165, 170 175 Q175 180, 165 185 Q145 180, 130 185 Z'
          fill='rgba(106, 141, 179, 0.6)'
          opacity='0.6'
        />

        {/* Glowing dots representing cities/nodes */}
        <circle cx='140' cy='135' r='2' fill='#6a8db3' opacity='0.9'>
          <animate attributeName='opacity' values='0.5;1;0.5' dur='2s' repeatCount='indefinite' />
        </circle>
        <circle cx='155' cy='145' r='1.5' fill='#6a8db3' opacity='0.8'>
          <animate attributeName='opacity' values='0.3;0.8;0.3' dur='3s' repeatCount='indefinite' />
        </circle>
        <circle cx='145' cy='175' r='1.8' fill='#6a8db3' opacity='0.7'>
          <animate
            attributeName='opacity'
            values='0.4;0.9;0.4'
            dur='2.5s'
            repeatCount='indefinite'
          />
        </circle>

        {/* Planet rings (front) */}
        <ellipse
          cx='150'
          cy='150'
          rx='110'
          ry='25'
          fill='none'
          stroke='url(#ringGradient)'
          strokeWidth='1.5'
          opacity='0.8'
          transform='rotate(-20 150 150)'
        />

        {/* Subtle highlight on planet edge */}
        <circle
          cx='150'
          cy='150'
          r='78'
          fill='none'
          stroke='rgba(106, 141, 179, 0.4)'
          strokeWidth='1'
        />
      </svg>

      {/* Floating particles around planet */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(8)].map((_, i) => {
          // Фиксированные координаты для частиц планеты
          const particlePositions = [
            { left: 25, top: 30 },
            { left: 75, top: 25 },
            { left: 45, top: 70 },
            { left: 65, top: 45 },
            { left: 35, top: 60 },
            { left: 80, top: 55 },
            { left: 20, top: 75 },
            { left: 55, top: 20 },
          ];
          const pos = particlePositions[i] || { left: 50, top: 50 };

          return (
            <div
              key={i}
              className='absolute w-1 h-1 bg-blue-light rounded-full opacity-60 animate-pulse'
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
