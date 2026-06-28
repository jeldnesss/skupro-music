import axios, { AxiosError } from 'axios';
import { refreshToken } from './refreshToken';

export const withReAuth = async <T>(callback: () => Promise<T>): Promise<T> => {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      await refreshToken();

      return await callback();
    }

    throw error;
  }
};
