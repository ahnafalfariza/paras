import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Colors from '../../../utils/color';
import { ResponsiveFont } from '../../../utils/ResponsiveFont';

const TextContent = ({ body }) => {
  return (
    <View style={_styles.container}>
      <ScrollView
        style={_styles.scrollview}
        bounces={false}
        contentContainerStyle={_styles.contentContainer}
      >
        <Text style={_styles.text}>{body}</Text>
      </ScrollView>
    </View>
  );
};

export default TextContent;

const _styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 48,
  },
  scrollview: {
    paddingHorizontal: 48,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: ResponsiveFont(15),
    fontFamily: 'Inconsolata-SemiBold',
    color: Colors['white-1'],
  },
});
