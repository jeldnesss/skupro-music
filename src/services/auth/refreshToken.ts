import axios from 'axios';
import { BASE_URL } from '../constants';

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');

  const res = await axios.post(
    BASE_URL + '/user/token/refresh/',
    { refresh },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  localStorage.setItem('access', res.data.access);

  return res.data.access;
};
