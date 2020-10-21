import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback, Alert } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import MainButton from '../../component/Common/MainButton';
import RoutesName from '../../utils/RoutesName';
import { ResponsiveFont } from '../../utils/ResponsiveFont';
import { CustomToast } from '../../utils/CustomToast';

const SeedPasswordScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const copyToClipboard = () => {
    Clipboard.setString(data.seedPassword);
    CustomToast('Seed password copied to clipboard', 0, 'default', 1000);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        'Registration uncomplete',
        'You have not finish your registration yet. Are you sure to discard and leave the screen?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  }, [navigation]);

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
        <TouchableNativeFeedback onPress={copyToClipboard}>
          <Text
            style={[
              _styles.textDesc,
              { paddingHorizontal: 12, paddingVertical: 4, backgroundColor: Colors['dark-16'] },
            ]}
          >
            Copy
          </Text>
        </TouchableNativeFeedback>
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
    fontSize: ResponsiveFont(14),
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
    fontSize: ResponsiveFont(16),
    padding: 16,
    color: Colors['white-1'],
    textAlign: 'center',
    alignSelf: 'center',
  },
});
