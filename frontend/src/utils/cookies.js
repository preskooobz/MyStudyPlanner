/**
 * Utilitaires pour gérer les cookies côté client
 */

// Récupérer un cookie par son nom
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
    } catch (e) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
  }
  return null;
};

// Définir un cookie
export const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;
  document.cookie = `${name}=${encodeURIComponent(cookieValue)};${expires};path=/;SameSite=Lax`;
};

// Supprimer un cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Vérifier si un cookie existe
export const hasCookie = (name) => {
  return getCookie(name) !== null;
};

// Récupérer l'utilisateur depuis le cookie
export const getUserFromCookie = () => {
  return getCookie('user');
};

// Sauvegarder l'utilisateur dans un cookie
export const saveUserToCookie = (user, days = 1) => {
  setCookie('user', user, days);
};

// Supprimer l'utilisateur du cookie
export const removeUserFromCookie = () => {
  deleteCookie('user');
};
