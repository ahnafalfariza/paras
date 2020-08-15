import { Auth } from '../actions/types';

const INITIAL_STATE = {
  user: {
    id: 'zilalvs.testnet',
    imgAvatar: {
      url: 'QmUMKPXyPogETNyJvZCPdgd6qDSeEdLWK5nmdZtbkzGVra',
      type: 'ipfs',
    },
    bio: 'written thoughts; constantly educating myself.',
    createdAt: '1593851018660737775',
  },
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
