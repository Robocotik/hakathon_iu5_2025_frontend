import { CalculationResponse } from "@/shared/api/calc/calc";
import { Observation } from "@/types/observation";

interface CalculationResultProps {
  calculationResult: Observation | null;
  backendData?: {
    success: boolean;
    error?: string;
    time?: string;
    value?: number;
    fullData?: CalculationResponse;
  } | null;
}

export const CalculationResult = ({
  calculationResult,
  backendData,
}: CalculationResultProps) => {
  if (!backendData) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 w-full">
        <div className="text-white/60 text-center text-sm">
          Данные расчета не получены
        </div>
      </div>
    );
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return `${hours} часов ${minutes} минут`;
  };

  return (
    <div className="text-sm h-full flex flex-col">
      <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar max-h-[calc(100%-4rem)]">
        {/* Основные данные */}
        <div className="text-white font-semibold text-lg text-center mb-4">
          {backendData.success
            ? "Время до столкновения"
            : "Вероятность падения"}
        </div>

        <div className="text-center mb-4">
          <div
            className={`text-2xl font-bold ${
              backendData.success ? "text-red-400" : "text-blue-400"
            }`}
          >
            {backendData.success
              ? formatTime(backendData.time || "00:00")
              : `${backendData.value || 0}%`}
          </div>
          <div className="text-white/60 text-sm mt-1">
            {backendData.success
              ? "Оставшееся время"
              : "Вероятность столкновения"}
          </div>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-medium text-center mb-4 ${
            backendData.success
              ? "bg-red-500/30 text-red-300 border border-red-500/50"
              : "bg-blue-500/30 text-blue-300 border border-blue-500/50"
          }`}
        >
          {backendData.success ? "КРИТИЧЕСКИЙ УРОВЕНЬ" : "МОНИТОРИНГ"}
        </div>

        {/* Полные данные (если есть) */}
        {backendData.fullData && (
          <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 w-full mb-4">
            <div className="text-white/80 text-sm font-medium mb-2 text-center">
              Детали расчета
            </div>
            <div className="text-white/60 text-xs space-y-1">
              {backendData.fullData.semi_major_axis_au && (
                <div>
                  Большая полуось:{" "}
                  {backendData.fullData.semi_major_axis_au.toFixed(2)} а.е.
                </div>
              )}
              {backendData.fullData.eccentricity && (
                <div>
                  Эксцентриситет: {backendData.fullData.eccentricity.toFixed(3)}
                </div>
              )}
              {backendData.fullData.inclination_deg && (
                <div>
                  Наклонение: {backendData.fullData.inclination_deg.toFixed(1)}°
                </div>
              )}
              {backendData.fullData.closest_distance_au && (
                <div>
                  Ближайшее расстояние:{" "}
                  {backendData.fullData.closest_distance_au.toFixed(2)} а.е.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Сообщение об ошибке */}
        {backendData.error && !backendData.success && (
          <div className="text-yellow-400 text-xs text-center">
            {backendData.error}
          </div>
        )}
      </div>
    </div>
  );
};
