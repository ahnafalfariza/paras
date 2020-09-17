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
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const PostOwner = ({ user, id, onPressOption }) => {
  const navigation = useNavigation();
  const route = useRoute();

  let isSameRoute = false;
  if (route.name === 'UserProfile') {
    isSameRoute = user.id === route.params.user.id;
  }

  return (
    <View style={_styles.container}>
      <TouchableWithoutFeedback
        onPress={() => (isSameRoute ? null : navigation.push(RoutesName.UserProfile, { user }))}
      >
        <View style={_styles.userView}>
          <FastImage source={{ uri: getImageUrl(user.imgAvatar) }} style={_styles.userImage} />
          <Text style={_styles.userText}>{user.id}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPressOption}>
        <View style={{ padding: 8 }}>
          <SvgXml
            xml={assetSvg.common.more}
            width="24"
            height="24"
            style={{ justifyContent: 'flex-end' }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PostOwner;

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  userText: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: ResponsiveFont(14),
    color: Colors['white-1'],
  },
  userImage: {
    height: 32,
    width: 32,
    margin: 8,
    borderRadius: 16,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
