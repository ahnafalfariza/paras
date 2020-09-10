import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';

const PostAction = ({ id }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12 }}>
      <TouchableWithoutFeedback onPress={() => console.log('pieces')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.piece}
            width="22"
            height="22"
            style={{ marginRight: 6 }}
          />
          <Text style={_styles.memento}>Piece</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Comment', { id: id })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.comment}
            width="22"
            height="22"
            style={{ marginRight: 6 }}
          />
          <Text style={_styles.memento}>Comment</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => console.log('share')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.share}
            width="22"
            height="22"
            style={{ marginRight: 6 }}
          />
          <Text style={_styles.memento}>Share</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PostAction;

const _styles = StyleSheet.create({
  memento: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: 16,
    color: Colors['white-1'],
  },
});
