import { Timestamp } from 'typeorm';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type UserPayload = {
  login: string;
  userId: string;
  iat: number;
  exp: number;
};
