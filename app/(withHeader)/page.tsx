import { Planet } from '../components/Planet';
import { RealComets } from '../components/RealComets';
import { useGetStars } from '../hooks/useGetStars';

export default function Home() {
  const stars = useGetStars();

  return (
    <main className='h-full bg-transparent relative overflow-hidden'>
      {/* Main content area */}
      <div className='flex z-0 items-center justify-center min-h-[calc(100vh-105px)] relative'>
        {/* Planet component */}
        <div className='relative z-10'>
          <Planet size={250} className='drop-shadow-2xl' />

          {/* Real comets from calculation history */}
          <RealComets planetSize={250} className='z-20' />
        </div>

        {/* Floating stars/particles */}
        <div className='absolute inset-0 pointer-events-none'>
          {stars.slice(0, 20).map((star, i) => (
            <div
              key={i}
              className='absolute w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse'
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Ваши контейнеры внизу */}
      {/* <FormLayout /> */}
    </main>
  );
}
