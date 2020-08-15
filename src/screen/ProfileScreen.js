import React, { Component } from 'react';

import Screen from '../component/Common/Screen';
import MainHeader from '../component/Header/MainHeader';
import Profile from '../component/Profile/Profile';

const user = {
  id: 'zilalvs.testnet',
  imgAvatar: {
    url: 'QmUMKPXyPogETNyJvZCPdgd6qDSeEdLWK5nmdZtbkzGVra',
    type: 'ipfs',
  },
  bio: 'written thoughts; constantly educating myself.',
  createdAt: '1593851018660737775',
};

class ProfileScreen extends Component {
  render() {
    return (
      <>
        <MainHeader title={'Profile'} />
        <Screen>
          <Profile data={user} />
        </Screen>
      </>
    );
  }
}

export default ProfileScreen;
