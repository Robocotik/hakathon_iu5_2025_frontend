// Фиксированный массив координат звезд для избежания проблем с гидратацией
const FIXED_STARS_COORDINATES = [
  { left: 12.5, top: 8.3, animationDelay: 0.5, animationDuration: 3.2 },
  { left: 85.7, top: 15.6, animationDelay: 1.8, animationDuration: 2.4 },
  { left: 45.2, top: 92.1, animationDelay: 2.3, animationDuration: 4.1 },
  { left: 73.9, top: 34.7, animationDelay: 0.9, animationDuration: 3.8 },
  { left: 29.4, top: 67.2, animationDelay: 1.4, animationDuration: 2.9 },
  { left: 91.8, top: 78.5, animationDelay: 2.7, animationDuration: 3.5 },
  { left: 18.6, top: 23.9, animationDelay: 0.2, animationDuration: 4.3 },
  { left: 56.3, top: 89.4, animationDelay: 1.9, animationDuration: 2.7 },
  { left: 67.1, top: 12.8, animationDelay: 2.1, animationDuration: 3.9 },
  { left: 34.8, top: 45.6, animationDelay: 0.7, animationDuration: 2.8 },
  { left: 82.4, top: 56.7, animationDelay: 1.5, animationDuration: 4.2 },
  { left: 15.9, top: 71.3, animationDelay: 2.4, animationDuration: 3.1 },
  { left: 94.2, top: 28.9, animationDelay: 0.8, animationDuration: 2.6 },
  { left: 41.7, top: 83.4, animationDelay: 1.7, animationDuration: 3.7 },
  { left: 78.5, top: 19.2, animationDelay: 2.9, animationDuration: 4.4 },
  { left: 23.1, top: 65.8, animationDelay: 0.4, animationDuration: 2.3 },
  { left: 69.8, top: 91.7, animationDelay: 1.2, animationDuration: 3.6 },
  { left: 52.4, top: 37.5, animationDelay: 2.6, animationDuration: 2.9 },
  { left: 87.6, top: 74.1, animationDelay: 0.6, animationDuration: 4.1 },
  { left: 36.2, top: 26.4, animationDelay: 1.8, animationDuration: 3.3 },
  { left: 14.7, top: 58.9, animationDelay: 2.2, animationDuration: 2.7 },
  { left: 71.3, top: 85.2, animationDelay: 0.9, animationDuration: 3.8 },
  { left: 59.8, top: 14.6, animationDelay: 1.6, animationDuration: 4.2 },
  { left: 92.5, top: 42.8, animationDelay: 2.8, animationDuration: 2.5 },
  { left: 27.9, top: 76.3, animationDelay: 0.3, animationDuration: 3.4 },
  { left: 84.1, top: 31.7, animationDelay: 1.4, animationDuration: 4.3 },
  { left: 48.6, top: 68.9, animationDelay: 2.1, animationDuration: 2.8 },
  { left: 76.4, top: 87.6, animationDelay: 0.7, animationDuration: 3.9 },
  { left: 19.3, top: 49.1, animationDelay: 1.9, animationDuration: 2.6 },
  { left: 63.7, top: 21.4, animationDelay: 2.5, animationDuration: 4.1 },
];

export const useGetStars = () => {
  return FIXED_STARS_COORDINATES;
};
