'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { useGetStars } from '../../hooks/useGetStars';
import { useHistoryData, type HistoryItem } from '../../hooks/useHistoryData';

export default function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const { history, loading, error, refreshHistory } = useHistoryData();
  const stars = useGetStars();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'error':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'processing':
        return 'Обработка';
      case 'error':
        return 'Ошибка';
      default:
        return 'Неизвестно';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'calculation' ? 'settings' : 'search';
  };

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
            <h1 className='text-3xl font-bold text-white mb-2'>История расчетов</h1>
            <p className='text-gray-300'>Ваши предыдущие расчеты и наблюдения</p>
          </div>

          {/* History List */}
          <div className='space-y-4'>
            {loading && (
              <div className='text-center py-12'>
                <div className='animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4'></div>
                <p className='text-gray-400'>Загрузка истории...</p>
              </div>
            )}

            {error && (
              <div className='bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center'>
                <Icon name='info' className='w-8 h-8 text-red-400 mx-auto mb-2' />
                <p className='text-red-400 mb-3'>{error}</p>
                <button
                  onClick={refreshHistory}
                  className='px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors'>
                  Попробовать снова
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 
                         hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer
                         hover:shadow-lg hover:shadow-blue-500/20'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-4 flex-1'>
                      {/* Type Icon */}
                      <div className='p-3 bg-blue-500/20 rounded-lg'>
                        <Icon name={getTypeIcon(item.type)} className='w-6 h-6 text-blue-400' />
                      </div>

                      {/* Content */}
                      <div className='flex-1'>
                        <div className='flex items-center space-x-3 mb-2'>
                          <h3 className='text-xl font-semibold text-white'>{item.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </div>

                        <p className='text-gray-300 mb-3'>{item.preview}</p>

                        <div className='flex items-center text-sm text-gray-400'>
                          <Icon name='clock' className='w-4 h-4 mr-2' />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <Icon name='chevron-right' className='w-5 h-5 text-gray-400' />
                  </div>
                </div>
              ))}
          </div>

          {/* Empty State */}
          {!loading && !error && history.length === 0 && (
            <div className='text-center py-12'>
              <div className='p-6 bg-white/5 rounded-xl inline-block mb-4'>
                <Icon name='history' className='w-12 h-12 text-gray-400' />
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>История пуста</h3>
              <p className='text-gray-400'>Здесь будут отображаться ваши расчеты и наблюдения</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white/10 backdrop-blur-md rounded-xl border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='p-6 border-b border-white/20'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-blue-500/20 rounded-lg'>
                    <Icon name={getTypeIcon(selectedItem.type)} className='w-5 h-5 text-blue-400' />
                  </div>
                  <div>
                    <h2 className='text-xl font-bold text-white'>{selectedItem.title}</h2>
                    <p className='text-gray-400 text-sm'>{formatDate(selectedItem.date)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className='p-2 hover:bg-white/10 rounded-lg transition-colors'>
                  <Icon name='x' className='w-5 h-5 text-gray-400' />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className='p-6 space-y-6'>
              {/* Description */}
              <div>
                <h3 className='text-lg font-semibold text-white mb-3'>Описание</h3>
                <p className='text-gray-300'>{selectedItem.details.description}</p>
              </div>

              {/* Parameters */}
              <div>
                <h3 className='text-lg font-semibold text-white mb-3'>Параметры</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {Object.entries(selectedItem.details.parameters).map(([key, value]) => (
                    <div key={key} className='bg-white/5 rounded-lg p-3'>
                      <div className='text-sm text-gray-400 mb-1'>{key}</div>
                      <div className='text-white font-medium'>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <h3 className='text-lg font-semibold text-white mb-3'>Результаты</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {Object.entries(selectedItem.details.results).map(([key, value]) => (
                    <div key={key} className='bg-white/5 rounded-lg p-3'>
                      <div className='text-sm text-gray-400 mb-1'>{key}</div>
                      <div className='text-white font-medium'>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
