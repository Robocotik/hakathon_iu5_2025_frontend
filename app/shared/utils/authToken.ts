// Утилиты для работы с токенами аутентификации

export const authTokenUtils = {
  // Получить токен из localStorage
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  },

  // Сохранить токен в localStorage
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('authToken', token);
  },

  // Удалить токен из localStorage (для logout)
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('authToken');
  },

  // Проверить, есть ли токен
  hasToken: (): boolean => {
    return !!authTokenUtils.getToken();
  },

  // Проверить, авторизован ли пользователь
  isAuthenticated: (): boolean => {
    const token = authTokenUtils.getToken();
    return !!token && token !== 'undefined' && token !== 'null';
  },
};
