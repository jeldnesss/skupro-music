import axios from 'axios';
import { BASE_URL } from '../constants';

type AuthUserProps = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access: string;
  refresh: string;
};

export const authUser = async (data: AuthUserProps): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${BASE_URL}/user/token/`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

type SignUpProps = {
  email: string;
  password: string;
  username: string;
};

type SignUpResponse = {
  message: string;
  success: boolean;
  result: {
    username: string;
    email: string;
    _id: number;
  };
};

export const signUpUser = async (
  data: SignUpProps,
): Promise<SignUpResponse> => {
  const res = await axios.post<SignUpResponse>(
    `${BASE_URL}/user/signup/`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return res.data;
};
