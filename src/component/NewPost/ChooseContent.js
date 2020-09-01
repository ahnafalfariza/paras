import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg';

import assetSvg from '../../assets/svg/svg';

const ChooseContent = ({ onPress, canDelete }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <SvgXml xml={assetSvg.newPost.image} width="36" height="36" style={{ margin: 8 }} />
        <TouchableNativeFeedback onPress={() => onPress('text')}>
          <SvgXml xml={assetSvg.newPost.text} width="36" height="36" style={{ margin: 8 }} />
        </TouchableNativeFeedback>
        <SvgXml xml={assetSvg.newPost.link} width="36" height="36" style={{ margin: 8 }} />
      </View>
      {canDelete && (
        <SvgXml
          xml={assetSvg.newPost.delete}
          width="36"
          height="36"
          style={{ alignSelf: 'center', position: 'absolute', bottom: 32 }}
        />
      )}
    </>
  );
};

export default ChooseContent;
