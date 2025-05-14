import axios from 'axios';
import type { Finance, FinanceRequest } from '../types/finance';
import type {
  LoginUserData,
  SignupUserData,
  User,
  UserCreated,
} from '../types/auth';

const apiConfig = {
  url: 'http://localhost:5000/api/',
  finance: 'finance/',
  authLogin: 'login/',
  authSignup: 'signup/',
};

export const getAllFinanceByUserId = async (id: string) => {
  const response = await axios.get<Finance[]>(
    `${apiConfig.url}${apiConfig.finance}${id}`,
  );

  return response.data;
};

export const postNewFinanceByUserId = async (finance: FinanceRequest) => {
  const response = await axios.post<Finance>(
    `${apiConfig.url}${apiConfig.finance}`,
    finance,
  );

  return response.data;
};

export const putFinanceById = async (id: string, finance: FinanceRequest) => {
  const response = await axios.put<Finance>(
    `${apiConfig.url}${apiConfig.finance}${id}`,
    finance,
  );

  return response.data;
};

export const deleteAllFinance = async (userId: string) => {
  const response = await axios.delete(
    `${apiConfig.url}${apiConfig.finance}all`,
    { data: { userId } },
  );

  return response.data;
};

export const deleteOneFinance = async (financeId: string) => {
  const response = await axios.delete(
    `${apiConfig.url}${apiConfig.finance}${financeId}`,
  );

  return response.data;
};

export const loginUser = async (loginInfo: LoginUserData) => {
  const response = await axios.post<User>(
    `${apiConfig.url}${apiConfig.authLogin}`,
    loginInfo,
  );

  return response.data;
};

export const signupUser = async (signupInfo: SignupUserData) => {
  const response = await axios.post<UserCreated>(
    `${apiConfig.url}${apiConfig.authLogin}`,
    signupInfo,
  );

  return response.data;
};
