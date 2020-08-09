import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import Colors from '../../../utils/color';

const TextContent = ({ body }) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, paddingVertical: 48 }}>
      <ScrollView
        style={{ paddingHorizontal: 48 }}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Text
          style={{ fontSize: 18, fontFamily: 'Inconsolata-SemiBold', color: Colors['white-1'] }}
        >
          {body}
        </Text>
      </ScrollView>
    </View>
  );
};

export default TextContent;
