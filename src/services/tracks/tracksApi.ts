import { SongType } from '@/sharedTypes/sharedTypes';
import { BASE_URL } from '../constants';
import axios from 'axios';

export const getTracks = (): Promise<SongType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};
export const getCategoryById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/catalog/selection/${id}/`);
  return res.data;
};
export const getTracksByIds = async (ids: number[]) => {
  const res = await Promise.all(
    ids.map((id) => axios.get(`${BASE_URL}/catalog/track/${id}/`)),
  );

  return res.map((r) => r.data.data);
};
