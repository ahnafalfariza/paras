import { Auth, User } from '../actions/types';

const INITIAL_STATE = {
  profile: null,
  token: null,
  isLoggedIn: false,
  followingList: [],
  walletBalance: 0,
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

    case Auth.SET_BALANCE:
      return {
        ...state,
        walletBalance: action.payload.walletBalance,
      };

    case User.TOGGLE_FOLLOW: {
      const newList = [...state.followingList];
      const idx = newList.indexOf(action.payload.id);
      idx > -1 ? newList.splice(idx, 1) : newList.push(action.payload.id);
      return {
        ...state,
        followingList: newList,
      };
    }

    case User.UPDATE_USER:
      return {
        ...state,
        profile: action.payload.profile,
      };

    case Auth.LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
}
