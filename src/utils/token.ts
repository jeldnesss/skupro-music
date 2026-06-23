export const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

export const getAccessToken = () => {
  return localStorage.getItem('access');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh');
};

export const removeTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};