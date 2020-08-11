import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';

const PostAction = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
      <TouchableNativeFeedback onPress={() => console.log('pieces')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.piece}
            width="22"
            height="22"
            style={{ marginRight: 6 }}
            fill={Colors['white-1']}
          />
          <Text style={_styles.memento}>Piece</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => console.log('comment')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.comment}
            width="22"
            height="22"
            style={{ marginRight: 6 }}
            fill={Colors['white-1']}
          />
          <Text style={_styles.memento}>Comment</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => console.log('share')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.share}
            width="22"
            height="22"
            style={{ marginRight: 6 }}
            fill={Colors['white-1']}
          />
          <Text style={_styles.memento}>Share</Text>
        </View>
      </TouchableNativeFeedback>
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
