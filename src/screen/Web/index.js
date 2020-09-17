import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Web from '../../component/Common/Web';
import MainHeader from '../../component/Header/MainHeader';
import { CustomToast } from '../../utils/CustomToast';

const WebScreen = ({ title, url }) => {
  return (
    <>
      <MainHeader
        title={title}
        leftComponent="close"
        rightComponent={
          <TouchableWithoutFeedback
            onPress={() => {
              Clipboard.setString(url);
              CustomToast('Link copied!', 0, 'default', 1000);
            }}
          >
            <View>
              <Text
                style={{
                  color: 'white',
                }}
              >
                Copy Link
              </Text>
            </View>
          </TouchableWithoutFeedback>
        }
      />
      <Web url={url} />
    </>
  );
};

export default WebScreen;
