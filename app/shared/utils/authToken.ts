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
    console.log('Setting token to localStorage');
    localStorage.setItem('authToken', token);
    // Проверяем, что токен действительно сохранился
    const savedToken = localStorage.getItem('authToken');
    console.log('Token saved:', savedToken === token ? 'success' : 'failed');
    // Вызываем событие для обновления UI
    window.dispatchEvent(new CustomEvent('authTokenChanged'));
  },

  // Удалить токен из localStorage (для logout)
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    console.log('Removing token from localStorage');
    localStorage.removeItem('authToken');
    // Дополнительная проверка, что токен действительно удален
    const remainingToken = localStorage.getItem('authToken');
    if (remainingToken) {
      console.warn('Token still exists after removal, forcing clear');
      localStorage.clear();
    }
    console.log('Token removed successfully');
    // Вызываем событие для обновления UI
    window.dispatchEvent(new CustomEvent('authTokenChanged'));
  },

  // Проверить, есть ли токен
  hasToken: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!authTokenUtils.getToken();
  },

  // Проверить, авторизован ли пользователь
  isAuthenticated: (): boolean => {
    const token = authTokenUtils.getToken();
    return !!token && token !== 'undefined' && token !== 'null';
  },
};
