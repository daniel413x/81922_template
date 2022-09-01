import jwt_decode from 'jwt-decode';
import {
  IUser,
  QueryResUserRegistration,
  QueryReqEditUser,
} from '../types/types';
import { $authHost, $host } from './index';

export const registration = async (email: string, password: string): Promise<QueryResUserRegistration> => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
  });
  localStorage.setItem('registeredToken', data.token);
  const newUser = jwt_decode(data.token) as IUser;
  return { newUser };
};

export const login = async (email: string, password: string): Promise<IUser> => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('registeredToken', data.token);
  return jwt_decode(data.token);
};

export const editUser = async (obj: QueryReqEditUser | FormData): Promise<IUser> => {
  const { data } = await $authHost.put('api/user', obj);
  localStorage.setItem('registeredToken', data.token);
  return jwt_decode(data.token);
};

export const createGuestToken = async (): Promise<{ id: string }> => {
  const { data } = await $host.post('api/user/guesttoken');
  localStorage.setItem('guestToken', data.token);
  return jwt_decode(data.token);
};

export const autoAuth = async (): Promise<IUser> => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('registeredToken', data.token);
  return jwt_decode(data.token);
};
