import { Auth } from './types';

export const initUser = (data) => ({
  type: Auth.INIT_USER,
  payload: {
    user: data,
    error: false,
  },
});
