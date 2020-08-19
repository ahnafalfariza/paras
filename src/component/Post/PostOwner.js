import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import Colors from '../../utils/color';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';
import RoutesName from '../../utils/RoutesName';

const PostOwner = ({ user }) => {
  const navigation = useNavigation();
  const route = useRoute();

  let isSameRoute = false;
  if (route.name === 'UserProfile') {
    isSameRoute = user.id === route.params.user.id;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => (isSameRoute ? null : navigation.push(RoutesName.UserProfile, { user }))}
      >
        <View style={_styles.userView}>
          <FastImage source={{ uri: getImageUrl(user.imgAvatar) }} style={_styles.userImage} />
          <Text style={_styles.userText}>{user.id}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log('more')}>
        <View style={{ padding: 16 }}>
          <SvgXml
            xml={assetSvg.common.more}
            width="24"
            height="24"
            style={{ justifyContent: 'flex-end' }}
            fill={Colors['white-1']}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PostOwner;

const _styles = StyleSheet.create({
  userText: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: 18,
    color: Colors['white-1'],
  },

  userImage: {
    height: 36,
    width: 36,
    margin: 10,
  },

  userView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
