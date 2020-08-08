import React from 'react';
import { Header } from 'react-native-elements';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import Colors from '../utils/color';
import assetSvg from '../assets/svg/svg';

const MainHeader = ({ withBack, title }) => {
  const navigation = useNavigation();

  const leftComponent = () => (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={{ paddingLeft: 8 }}>
        <SvgXml xml={assetSvg.header.back} width="24" height="24" fill={Colors['white-1']} />
      </View>
    </TouchableWithoutFeedback>
  );

  const titleComponent = {
    text: title,
    style: {
      color: Colors['white-1'],
      fontFamily: 'Inconsolata-Bold',
      fontSize: 22,
      padding: 0,
    },
  };

  return (
    <Header
      placement="left"
      leftComponent={withBack ? leftComponent : null}
      centerComponent={titleComponent}
      centerContainerStyle={{ paddingHorizontal: withBack ? 16 : 8 }}
      containerStyle={{
        backgroundColor: Colors['dark-12'],
        borderBottomWidth: 0,
      }}
    />
  );
};

export default MainHeader;
