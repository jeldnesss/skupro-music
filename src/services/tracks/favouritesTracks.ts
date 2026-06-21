import axios from 'axios';
import { BASE_URL } from '../constants';

const getToken = () => localStorage.getItem('access');

export const getFavorites = async () => {
  const token = getToken();

  if (!token) {
    throw new Error('No access token');
  }

  const res = await axios.get(`${BASE_URL}/catalog/track/favorite/all/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addFavorite = async (id: number) => {
  const token = getToken();

  if (!token) {
    throw new Error('No access token');
  }

  const res = await axios.post(
    `${BASE_URL}/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const removeFavorite = async (id: number) => {
  const token = getToken();

  if (!token) {
    throw new Error('No access token');
  }

  const res = await axios.delete(`${BASE_URL}/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
