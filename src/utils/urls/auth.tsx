import { BASE_URL } from "utils/network/network";

export const LoginUrl = BASE_URL + '/auth/login';

export const SIGNUP_URL = BASE_URL + '/users/sign-up';

export const GET_USER_URL = BASE_URL + '/users/';

export const DELETE_USER_URL = (id: any) => `${BASE_URL}/users/${id}`;


