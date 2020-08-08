import { Auth } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Auth.INIT_USER:
      return { user: action.payload, error: false };
    default:
      return state;
  }
}
