import { Auth } from '../actions/types';

const INITIAL_STATE = {
  profile: null,
  token: null,
  isLoggedIn: false,
  followingList: [],
  error: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Auth.INIT_USER:
      return {
        ...state,
        profile: action.payload.profile,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case Auth.INIT_FOLLOWING:
      return {
        ...state,
        followingList: action.payload.followingList,
      };
    case Auth.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
