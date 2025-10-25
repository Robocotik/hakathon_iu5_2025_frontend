import {authTokenUtils} from '../../utils/authToken';

export const logoutUser = () => {
  // Удаляем токен из localStorage
  authTokenUtils.removeToken();

  // Можно добавить дополнительную логику logout
  console.log('User logged out, token removed');

  // Перенаправляем на страницу входа
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
