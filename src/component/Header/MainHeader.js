import React from 'react';
import { Header } from 'react-native-elements';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';

const MainHeader = ({ withBack, title, rightComponent, centerComponent }) => {
  const navigation = useNavigation();

  const leftComponent = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={{ paddingLeft: 8 }}>
          <SvgXml xml={assetSvg.header.back} width="24" height="24" fill={Colors['white-1']} />
        </View>
      </TouchableWithoutFeedback>
    );
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
      leftComponent={withBack ? leftComponent : null}
      leftContainerStyle={{ flex: 0 }}
      rightComponent={rightComponent}
      rightContainerStyle={{ flex: 0 }}
      centerComponent={isCenterCustom ? centerComponent : titleComponent}
      centerContainerStyle={{
        marginLeft: withBack ? 4 : 0,
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
