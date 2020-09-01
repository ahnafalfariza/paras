import React, { Component } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import Profile from '../../component/Profile/Profile';
import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import { logoutUser } from '../../actions/user';

class ProfileScreen extends Component {
  render() {
    if (this.props.profileData === null && !this.props.isLoggedIn) {
      return null;
    }

    return (
      <>
        <MainHeader
          title={'Profile'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={() => console.log('more profile')}>
              <View style={{ paddingRight: 4 }}>
                <SvgXml
                  xml={assetSvg.common.more}
                  width="28"
                  height="28"
                  style={{ justifyContent: 'flex-end' }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <Screen>
          <Profile data={this.props.profileData} />
          <MainButton title={'Logout'} onPress={this.props.logoutUser} />
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
