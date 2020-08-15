import React from 'react';
import { View, Text } from 'react-native';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import Colors from '../../utils/color';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const PostDate = ({ date }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Inconsolata-Regular',
          color: Colors['white-2'],
          margin: 8,
          fontSize: 13,
        }}
      >
        {timeAgo.format(new Date(date / 10 ** 6))}
      </Text>
      <View style={{ backgroundColor: Colors['white-1'], height: 1, marginHorizontal: 8 }} />
    </View>
  );
};

export default PostDate;
