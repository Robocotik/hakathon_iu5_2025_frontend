import { client } from "../axios";

export interface Observation {
  time: string;
  sunrise: string;
  declination: string;
  photo: string | null;
}

export interface BackendObservation {
  ra_hours: number;
  dec_degrees: number;
  timestamp: number;
}

export interface CalculationRequest {
  observations: BackendObservation[];
}

export interface CalculationResponse {
  success: boolean;
  error: string;
  semi_major_axis_au?: number;
  eccentricity?: number;
  inclination_deg?: number;
  longitude_ascending_node_deg?: number;
  argument_perihelion_deg?: number;
  perihelion_passage_jd?: number;
  closest_approach_jd?: number;
  closest_distance_au?: number;
}

// Обнови тип для backendData
export interface BackendResult {
  success: boolean;
  error: string;
  time?: string; // для отображения
  value?: number; // для отображения
  fullData?: CalculationResponse; // полные данные
}

const convertToBackendFormat = (
  observations: Observation[]
): BackendObservation[] => {
  return observations.map((obs, index) => {

    return {
      ra_hours: parseFloat(obs.time) || 5.2 + index * 0.02, 
      dec_degrees: parseFloat(obs.declination) || 22.4 + index * 0.05, 
      timestamp: Math.floor(Date.now() / 1000) + index * 86400,
    };
  });
};

export const calculateAsteroidImpact = async (
  observations: Observation[]
): Promise<CalculationResponse> => {
  try {
    const backendObservations = convertToBackendFormat(observations);

    const res = await client.post("/calc", {
      observations: backendObservations,
    });

    if (res.status >= 300) {
      throw new Error("Calculation failed");
    }

    return res.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Ошибка сети. Проверьте подключение к серверу.");
    }

    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new Error("Необходима авторизация");
      } else if (status === 422) {
        throw new Error("Некорректные данные для расчета");
      } else if (status >= 500) {
        throw new Error("Ошибка сервера. Попробуйте позже.");
      }
    }

    throw new Error(error.message || "Произошла ошибка при расчете");
  }
};
