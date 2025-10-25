import { calculateAsteroidImpact } from "@/shared/api/calc/calc";
import { Observation, ValidationErrors } from "@/types/observation";
import { useState } from "react";

export const useObservations = () => {
  const [currentObservation, setCurrentObservation] = useState<Observation>({
    time: "",
    sunrise: "",
    declination: "",
    photo: null,
  });

  const [observations, setObservations] = useState<Observation[]>([]);
  const [calculationResult, setCalculationResult] =
    useState<Observation | null>(null);
  const [backendData, setBackendData] = useState<{
    success: boolean;
    time: string;
    value: number;
  } | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "time":
        if (!value.trim()) return "Время обязательно для заполнения";
        if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value))
          return "Введите время в формате ЧЧ:ММ";
        return "";

      case "sunrise":
        if (!value.trim()) return "Восход обязателен для заполнения";
        if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value))
          return "Введите время в формате ЧЧ:ММ";
        return "";

      case "declination":
        if (!value.trim()) return "Склонение обязательно для заполнения";
        if (!/^-?\d+(\.\d+)?$/.test(value))
          return "Склонение должно быть числом";
        return "";

      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    newErrors.time = validateField("time", currentObservation.time);
    newErrors.sunrise = validateField("sunrise", currentObservation.sunrise);
    newErrors.declination = validateField(
      "declination",
      currentObservation.declination
    );

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setCurrentObservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: "Файл слишком большой (макс. 5MB)",
      }));
      return false;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        photo: "Выберите изображение",
      }));
      return false;
    }

    const url = URL.createObjectURL(file);
    setCurrentObservation((prev) => ({
      ...prev,
      photo: url,
    }));
    setErrors((prev) => ({ ...prev, photo: "" }));
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return false;

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
      setErrors({});
      return true;
    }
    return false;
  };

  const handleCalculate = async () => {
    if (observations.length === 0) return;

    setIsCalculating(true);
    try {
      const result = await calculateAsteroidImpact(observations);

      const formattedData = {
        success: result.success,
        time: result.closest_approach_jd
          ? convertJdToTime(result.closest_approach_jd)
          : "00:00",
        value: result.closest_distance_au
          ? Math.round(result.closest_distance_au * 100)
          : 0,
      };

      setBackendData(formattedData);
    } catch (error) {
      console.error("Error calculating impact:", error);
      setErrors((prev) => ({
        ...prev,
        calculate: "Ошибка при расчете орбиты",
      }));
    } finally {
      setIsCalculating(false);
    }
  };

  const convertJdToTime = (jd: number): string => {
    const hours = Math.floor(jd % 24);
    const minutes = Math.floor((jd * 60) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleDeleteObservation = (index: number) => {
    setObservations((prev) => prev.filter((_, i) => i !== index));
    if (calculationResult && observations[index] === calculationResult) {
      setCalculationResult(null);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    currentObservation,
    observations,
    calculationResult,
    backendData,
    errors,
    isCalculating,
    handleInputChange,
    handlePhotoChange,
    handleSubmit,
    handleCalculate,
    handleDeleteObservation,
    clearErrors,
    setCurrentObservation,
  };
};
