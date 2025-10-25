export interface Observation {
  time: string;
  sunrise: string;
  declination: string;
  photo: string | null;
}

export interface ValidationErrors {
  [key: string]: string;
}
