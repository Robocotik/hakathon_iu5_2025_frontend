import { Observation } from "@/types/observation";

interface CalculationResultProps {
  calculationResult: Observation | null;
  backendData?: {
    success: boolean;
    time: string;
    value: number;
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
    <div className="flex flex-col items-center justify-center h-full space-y-4 w-full max-h-[calc(100%-3rem)]">
      <div className="text-white font-semibold text-lg text-center">
        {backendData.success ? "Время до столкновения" : "Вероятность падения"}
      </div>

      <div className="text-center">
        <div
          className={`text-2xl font-bold ${
            backendData.success ? "text-red-400" : "text-blue-400"
          }`}
        >
          {backendData.success
            ? formatTime(backendData.time)
            : `${backendData.value}%`}
        </div>
        <div className="text-white/60 text-sm mt-1">
          {backendData.success
            ? "Оставшееся время"
            : "Вероятность столкновения"}
        </div>
      </div>

      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          backendData.success
            ? "bg-red-500/30 text-red-300 border border-red-500/50"
            : "bg-blue-500/30 text-blue-300 border border-blue-500/50"
        }`}
      >
        {backendData.success ? "КРИТИЧЕСКИЙ УРОВЕНЬ" : "МОНИТОРИНГ"}
      </div>
    </div>
  );
};
