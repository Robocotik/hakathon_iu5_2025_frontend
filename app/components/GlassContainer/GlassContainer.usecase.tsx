'use client';

import { useRef } from 'react';
import { GlassContainer } from '@/components/GlassContainer';
import { useObservations } from '@/hooks/useObservations';
import { ObservationInput } from '@/components/ObservationInput';
import { ObservationList } from '@/components/ObservationList';
import { CalculationResult } from '@/components/CalcResult';

export const FormLayout = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    currentObservation,
    observations,
    calculationResult,
    backendData,
    errors,
    handleInputChange,
    handlePhotoChange,
    handleSubmit,
    handleCalculate,
    handleDeleteObservation,
  } = useObservations();

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitClick = () => {
    if (handleSubmit()) {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 p-4'>
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-7xl mx-auto'>
        <GlassContainer
          title='Ввод наблюдения'
          className='p-4 w-full sm:w-80 h-80 min-w-0'
          onArrowClick={handleSubmitClick}>
          <ObservationInput
            currentObservation={currentObservation}
            errors={errors}
            onInputChange={handleInputChange}
            onPhotoChange={handlePhotoChange}
            fileInputRef={fileInputRef}
            onTriggerFileInput={triggerFileInput}
          />
        </GlassContainer>

        <GlassContainer
          title='Наблюдения'
          className='p-4 w-full sm:w-80 h-80 min-w-0 overflow-hidden'
          onArrowClick={handleCalculate}>
          <ObservationList
            observations={observations}
            onDeleteObservation={handleDeleteObservation}
          />
        </GlassContainer>

        <GlassContainer
          title='Результат расчета'
          className={`p-4 w-full sm:w-80 h-80 min-w-0 ${
            backendData?.success ? 'bg-red-500/20 border-2 border-red-500/50' : ''
          }`}>
          <CalculationResult calculationResult={calculationResult} backendData={backendData} />
        </GlassContainer>
      </div>
    </div>
  );
};
