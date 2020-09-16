import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Web from '../../component/Common/Web';
import MainHeader from '../../component/Header/MainHeader';
import { showMessage } from "react-native-flash-message";
import Colors from '../../utils/color';

const WebScreen = ({ title, url }) => {
  return (
    <>
      <MainHeader
        title={title}
        leftComponent='close'
        rightComponent={
          <TouchableWithoutFeedback onPress={() => {
            Clipboard.setString(url)
            showMessage({
              message: "Copied Link!",
              type: 'default',
              duration: 500,
              style: {
                minHeight: 0,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                color: Colors['white-1'],
                backgroundColor: Colors['dark-0'],
              }
            });
          }}>
            <View>
              <Text style={{
                color: 'white'
              }}>Copy Link</Text>
            </View>
          </TouchableWithoutFeedback>
        }
      />
      <Web url={url} />
    </>
  );
};

export default WebScreen;