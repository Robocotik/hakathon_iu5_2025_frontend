"use client";

import { useState, useRef } from "react";
import { GlassContainer } from "@/components/GlassContainer";
import { Input } from "@/components/Input";

interface Observation {
  time: string;
  sunrise: string;
  declination: string;
  photo: string | null;
}

export const FormLayout = () => {
  const [currentObservation, setCurrentObservation] = useState<Observation>({
    time: "",
    sunrise: "",
    declination: "",
    photo: null,
  });

  const [observations, setObservations] = useState<Observation[]>([]);
  const [calculationResult, setCalculationResult] =
    useState<Observation | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentObservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentObservation((prev) => ({
        ...prev,
        photo: url,
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitClick = () => {
    if (
      currentObservation.time ||
      currentObservation.sunrise ||
      currentObservation.declination ||
      currentObservation.photo
    ) {
      setObservations((prev) => [...prev, { ...currentObservation }]);
      setCurrentObservation({
        time: "",
        sunrise: "",
        declination: "",
        photo: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCalculateClick = () => {
    if (observations.length === 0) return;
    const lastObs = observations[observations.length - 1];
    setCalculationResult(lastObs);
  };

  const handleDeleteObservation = (index: number) => {
    setObservations((prev) => prev.filter((_, i) => i !== index));
    if (calculationResult && observations[index] === calculationResult) {
      setCalculationResult(null);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
        <GlassContainer
          title="Ввод наблюдения"
          className="p-4 w-full sm:w-80 h-80 min-w-0"
          onArrowClick={handleSubmitClick}
        >
          <div className="flex flex-col gap-3 h-full">
            <Input
              name="time"
              value={currentObservation.time}
              onChange={handleInputChange}
              placeholder="Время"
            />
            <Input
              name="sunrise"
              value={currentObservation.sunrise}
              onChange={handleInputChange}
              placeholder="Восход"
            />
            <Input
              name="declination"
              value={currentObservation.declination}
              onChange={handleInputChange}
              placeholder="Склонение"
            />
            <div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="w-full text-left px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm hover:bg-gray-600/50 transition"
              >
                {currentObservation.photo ? "Фото выбрано" : "Выбрать фото"}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </GlassContainer>

        <GlassContainer
          title="Наблюдения"
          className="p-4 w-full sm:w-80 h-80 min-w-0"
          onArrowClick={handleCalculateClick}
        >
          <div className="space-y-3 text-sm h-full overflow-y-auto">
            {observations.length === 0 ? (
              <div className="text-white/60 text-center py-4">
                Нет наблюдений
              </div>
            ) : (
              observations.map((obs, index) => (
                <div key={index} className="border-b border-gray-600/30 pb-2">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-white/80 text-xs">
                      Наблюдение {index + 1}:
                    </div>
                    <button
                      onClick={() => handleDeleteObservation(index)}
                      className="text-red-400 hover:text-red-300 text-xs bg-red-500/20 hover:bg-red-500/30 px-2 py-1 rounded transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                  <div className="text-white/80">• {obs.time || "-"}</div>
                  <div className="text-white/80">• {obs.sunrise || "-"}</div>
                  <div className="text-white/80">
                    • {obs.declination || "-"}
                  </div>
                  <div className="text-white/80">
                    • {obs.photo ? "Фото" : "-"}
                  </div>
                  {obs.photo && (
                    <img
                      src={obs.photo}
                      alt="Наблюдение"
                      className="mt-1 w-12 h-12 object-cover rounded border border-gray-600/30"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </GlassContainer>

        <GlassContainer
          title="Результат расчета"
          className="p-4 w-full sm:w-80 h-80 min-w-0"
        >
          <div className="flex flex-col justify-center items-start h-full text-sm space-y-2 w-full">
            <div className="text-white/80 w-full">
              Время: {calculationResult?.time || "-"}
            </div>
            <div className="text-white/80 w-full">
              Восход: {calculationResult?.sunrise || "-"}
            </div>
            <div className="text-white/80 w-full">
              Склонение: {calculationResult?.declination || "-"}
            </div>
            <div className="text-white/80 w-full">
              Фото: {calculationResult?.photo ? "Загружено" : "-"}
            </div>
            {calculationResult?.photo && (
              <img
                src={calculationResult.photo}
                alt="Результат"
                className="mt-2 w-16 h-16 object-cover rounded border border-gray-600/30"
              />
            )}
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};
