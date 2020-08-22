import { Auth } from '../actions/types';

const INITIAL_STATE = {
  profile: null,
  isLoggedIn: false,
  token: null,
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
    case Auth.LOGOUT_USER:
      return {
        ...state,
        profile: null,
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
