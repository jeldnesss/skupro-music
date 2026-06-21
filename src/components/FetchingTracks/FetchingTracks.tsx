'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { getTracks } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setLikedTracks,
} from '@/store/features/trackSlice';
import { getFavorites } from '@/services/tracks/favouritesTracks';
import { withReAuth } from '@/services/auth/withReAuth';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setFetchIsLoading(true));

        const token = localStorage.getItem('access');

        const tracksRes = await getTracks();

        dispatch(setAllTracks(tracksRes));

        if (token) {
          const likedRes = await withReAuth(getFavorites);

          console.log('LIKED RES:', likedRes);

          const likedIds = likedRes.data.map((track: any) => track._id);

          dispatch(setLikedTracks(likedIds));
        } else {
          dispatch(setLikedTracks([]));
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          dispatch(
            setFetchError(
              error.response?.data?.message || 'Ошибка загрузки данных',
            ),
          );
        } else {
          console.log('FULL ERROR:', error);
          dispatch(setFetchError('Неизвестная ошибка'));
        }
      } finally {
        dispatch(setFetchIsLoading(false));
      }
    };

    fetchData();
  }, []);
  return <></>;
}
