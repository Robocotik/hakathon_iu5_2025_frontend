import { Observation } from '@/types/observation';

interface ObservationListProps {
  observations: Observation[];
  onDeleteObservation: (index: number) => void;
}

export const ObservationList = ({ observations, onDeleteObservation }: ObservationListProps) => {
  return (
    <div className='text-sm h-full flex flex-col'>
      <div className='overflow-y-auto flex-grow pr-2 custom-scrollbar max-h-[calc(100%-1rem)]'>
        {observations.length === 0 ? (
          <div className='text-white/60 text-center py-4 h-full flex items-center justify-center'>
            Нет наблюдений
          </div>
        ) : (
          <div className='space-y-2'>
            {observations.map((obs, index) => (
              <div key={index} className='border-b border-gray-600/30 pb-2 last:border-b-0'>
                <div className='flex justify-between items-start mb-1'>
                  <div className='text-white/80 text-xs'>Наблюдение {index + 1}:</div>
                  <button
                    onClick={() => onDeleteObservation(index)}
                    className='text-red-400 hover:text-red-300 text-xs bg-red-500/20 hover:bg-red-500/30 px-2 py-1 rounded transition-colors flex-shrink-0 ml-2'>
                    Удалить
                  </button>
                </div>
                <div className='text-white/80 truncate'>• {obs.time || '-'}</div>
                <div className='text-white/80 truncate'>• {obs.sunrise || '-'}</div>
                <div className='text-white/80 truncate'>• {obs.declination || '-'}</div>
                <div className='text-white/80 truncate'>• {obs.photo ? 'Фото' : '-'}</div>
                {obs.photo && (
                  <img
                    src={obs.photo}
                    alt='Наблюдение'
                    className='mt-1 w-12 h-12 object-cover rounded border border-gray-600/30'
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
