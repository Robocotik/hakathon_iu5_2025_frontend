import { Input } from "@/components/Input";
import { Observation, ValidationErrors } from "@/types/observation";

interface ObservationInputProps {
  currentObservation: Observation;
  errors: ValidationErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoChange: (file: File) => boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onTriggerFileInput: () => void;
}

export const ObservationInput = ({
  currentObservation,
  errors,
  onInputChange,
  onPhotoChange,
  fileInputRef,
  onTriggerFileInput,
}: ObservationInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div>
        <Input
          name="time"
          value={currentObservation.time}
          onChange={onInputChange}
          placeholder="Время (ЧЧ:ММ)"
          className={`${errors.time ? "border-red-500" : "border-gray-600/30"}`}
        />
        {errors.time && (
          <div className="text-red-400 text-xs mt-1">{errors.time}</div>
        )}
      </div>

      <div>
        <Input
          name="sunrise"
          value={currentObservation.sunrise}
          onChange={onInputChange}
          placeholder="Восход (ЧЧ:ММ)"
          className={`${
            errors.sunrise ? "border-red-500" : "border-gray-600/30"
          }`}
        />
        {errors.sunrise && (
          <div className="text-red-400 text-xs mt-1">{errors.sunrise}</div>
        )}
      </div>

      <div>
        <Input
          name="declination"
          value={currentObservation.declination}
          onChange={onInputChange}
          placeholder="Склонение (число)"
          className={`${
            errors.declination ? "border-red-500" : "border-gray-600/30"
          }`}
        />
        {errors.declination && (
          <div className="text-red-400 text-xs mt-1">{errors.declination}</div>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={onTriggerFileInput}
          className={`w-full text-left px-3 py-2 bg-gray-700/50 border rounded-lg text-white text-sm hover:bg-gray-600/50 transition ${
            errors.photo ? "border-red-500" : "border-gray-600"
          }`}
        >
          {currentObservation.photo ? "Фото выбрано" : "Выбрать фото"}
        </button>
        {errors.photo && (
          <div className="text-red-400 text-xs mt-1">{errors.photo}</div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};
