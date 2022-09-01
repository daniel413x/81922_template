import { FC } from 'react';

export interface IRouterRoute {
  path: string;
  Component: FC;
}

export interface INavbarRoute {
  route: string;
  dataIcon: string;
  tooltip: string;
  tooltipClasses?: string;
}

export interface IUser {
  roles: string[];
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type QueryReqEditUser = Partial<Omit<IUser, 'id'>> & { password?: string; };

export type QueryResUserRegistration = {
  newUser: IUser;
};

export interface INotification {
  message?: string;
  color?: string;
  image?: string;
  timeout: number;
  id: number;
}
