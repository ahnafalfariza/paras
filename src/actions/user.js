import { Auth, User } from './types';

export const initUser = (data) => ({
  type: Auth.INIT_USER,
  payload: {
    profile: data.profile,
    token: data.token,
  },
});

export const updateUser = (data) => ({
  type: Auth.INIT_USER,
  payload: {
    profile: data.profile,
  },
});

export const initFollowing = (data) => ({
  type: Auth.INIT_FOLLOWING,
  payload: {
    followingList: data.followingList,
  },
});

export const setWalletBalance = (data) => ({
  type: Auth.SET_BALANCE,
  payload: {
    walletBalance: data.walletBalance,
  },
});

export const toggleFollow = (id) => ({
  type: User.TOGGLE_FOLLOW,
  payload: {
    id: id,
  },
});

export const logoutUser = () => ({
  type: Auth.LOGOUT_USER,
});
