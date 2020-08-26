import { Auth } from './types';

export const initUser = (data) => ({
  type: Auth.INIT_USER,
  payload: {
    profile: data.profile,
    profileId: data.profileId,
    token: data.token,
  },
});

export const initFollowing = (data) => ({
  type: Auth.INIT_FOLLOWING,
  payload: {
    followingList: data.followingList,
  },
});

export const logoutUser = () => ({
  type: Auth.LOGOUT_USER,
});
