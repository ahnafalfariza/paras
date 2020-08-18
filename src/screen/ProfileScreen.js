import React, { Component } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Screen from '../component/Common/Screen';
import MainHeader from '../component/Header/MainHeader';
import Profile from '../component/Profile/Profile';
import assetSvg from '../assets/svg/svg';
import Colors from '../utils/color';

class ProfileScreen extends Component {
  render() {
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
                  fill={Colors['white-1']}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <Screen>
          <Profile data={this.props.userData} />
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.user,
});

export default connect(mapStateToProps)(ProfileScreen);
