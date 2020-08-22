import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';

const SeedPasswordScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const copyToClipboard = () => {
    Clipboard.setString(data.seedPassword);
  };

  return (
    <Screen style={{ margin: 32, flex: 1, justifyContent: 'center' }}>
      <Text style={_styles.textDesc}>
        This is your seed password, it has 12 words and used as signature for your data so no one is
        able to modify or delete your data.
      </Text>
      <Text style={[_styles.textDesc, { marginTop: 24 }]}>
        Keep this seed password save and do not share them with anyone. Paras will not be able to
        recover your account if this seed password is lost.
      </Text>
      <View
        style={{
          marginTop: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={_styles.textDesc}>Seed Password</Text>
        <TouchableWithoutFeedback onPress={copyToClipboard}>
          <Text
            style={[
              _styles.textDesc,
              { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: Colors['dark-16'] },
            ]}
          >
            Copy
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={_styles.seedPasswordView}>
        <Text selectable style={_styles.seedPasswordText}>
          {data.seedPassword}
        </Text>
      </View>
      <MainButton
        title={"I'VE BACKUP THE SEED PASSWORD"}
        containerStyle={{ marginTop: 0, width: 'auto' }}
        onPress={() => {
          navigation.navigate(RoutesName.SeedConfirmation, { data: data });
        }}
      />
    </Screen>
  );
};

export default SeedPasswordScreen;

const _styles = StyleSheet.create({
  textDesc: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: 16,
    color: Colors['white-1'],
    lineHeight: 18,
  },
  seedPasswordView: {
    marginHorizontal: 16,
    marginVertical: 32,
    backgroundColor: Colors['dark-8'],
  },
  seedPasswordText: {
    fontFamily: 'Inconsolata-SemiBold',
    fontSize: 20,
    padding: 16,
    color: Colors['white-1'],
    textAlign: 'center',
    alignSelf: 'center',
  },
});
