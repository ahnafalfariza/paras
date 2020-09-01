import React from 'react';
import { Header } from 'react-native-elements';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';

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
      fontSize: 22,
      padding: 0,
    },
  };

  const isCenterCustom = centerComponent ? true : false;

  return (
    <Header
      placement={centerComponent ? 'center' : 'left'}
      leftComponent={leftComponent ? leftComponentIcon : null}
      leftContainerStyle={{ flex: 0, marginRight: 4, marginLeft: leftComponent ? 8 : 0 }}
      rightComponent={rightComponent}
      rightContainerStyle={{ flex: 0, marginRight: rightComponent ? 8 : 0 }}
      centerComponent={isCenterCustom ? centerComponent : titleComponent}
      centerContainerStyle={{
        paddingHorizontal: 8,
      }}
      containerStyle={{
        backgroundColor: Colors['dark-12'],
        borderBottomWidth: 0,
      }}
    />
  );
};

export default MainHeader;
