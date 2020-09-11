import React from 'react';
import { Header } from 'react-native-elements';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const MainHeader = ({ leftComponent, title, rightComponent, centerComponent }) => {
  const navigation = useNavigation();

  const leftComponentIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View>
          <SvgXml xml={leftIcon()} width="24" height="24" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const leftIcon = () => {
    if (leftComponent === 'back') {
      return assetSvg.header.back;
    } else if (leftComponent === 'close') {
      return assetSvg.header.close;
    }
  };

  const titleComponent = {
    text: title,
    style: {
      color: Colors['white-1'],
      fontFamily: 'Inconsolata-Bold',
      fontSize: ResponsiveFont(18),
      padding: 0,
    },
  };

  const isCenterCustom = centerComponent ? true : false;

  return (
    <Header
      placement={centerComponent ? 'center' : 'left'}
      leftComponent={leftComponent ? leftComponentIcon : null}
      leftContainerStyle={{ flex: 0, marginHorizontal: leftComponent ? 8 : 4 }}
      rightComponent={rightComponent}
      rightContainerStyle={{ flex: 0, marginHorizontal: rightComponent ? 8 : 4 }}
      centerComponent={isCenterCustom ? centerComponent : titleComponent}
      centerContainerStyle={{
        paddingHorizontal: 0,
      }}
      containerStyle={{
        backgroundColor: Colors['dark-12'],
        borderBottomWidth: 0,
      }}
    />
  );
};

export default MainHeader;
