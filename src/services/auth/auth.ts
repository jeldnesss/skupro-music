import { BASE_URL } from '../constants';
import axios from 'axios';

type authUserProp = {
  email: string;
  password: string;
};
type authUserReturn = {
  email: string;
  password: string;
  _id: number;
};
export const authUser = (data: authUserProp): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

type signUpProps = {
  email: string;
  password: string;
  username: string;
};

type signUpResponse = {
  message: string;
  success: boolean;
  result: {
    username: string;
    email: string;
    _id: number;
  };
};

export const signUpUser = (data: signUpProps): Promise<signUpResponse> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
