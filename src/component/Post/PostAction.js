import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

const PostAction = ({ id, onPressShare, showModalPiece }) => {
  const navigation = useNavigation();

  const onPressPiece = () => {
    showModalPiece(id);
  };

  const onPressComment = () => {
    navigation.navigate('Comment', { id: id });
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12 }}>
      <TouchableWithoutFeedback onPress={onPressPiece}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.piece}
            width="21"
            height="21"
            style={{ marginRight: 6 }}
          />
          <Text style={_styles.memento}>Piece</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPressComment}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.comment}
            width="21"
            height="21"
            style={{ marginRight: 6 }}
          />
          <Text style={_styles.memento}>Comment</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPressShare}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SvgXml
            xml={assetSvg.postContent.share}
            width="21"
            height="21"
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
    fontSize: ResponsiveFont(12),
    color: Colors['white-1'],
  },
});
