import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { SEARCH_USER_SEND } from '../../utils/api';
import DismissKeyboard from '../../component/Common/DismissKeyboard';

class WalletTransaction extends Component {
  state = {
    sendPacAmount: null,
    sendPacUser: null,
    userData: [],
    isSearchResultVisible: false,
  };

  searchUser = (query) => {
    if (query === '') {
      this.setState({ userData: [] });
    } else {
      Axios.get(SEARCH_USER_SEND(query))
        .then((res) => {
          this.setState({ userData: res.data.data });
        })
        .catch((err) => console.log(err));
    }
  };

  onChangeSearchUser = (text) => {
    this.setState({ sendPacUser: text });
    this.searchUser(text);
  };

  listSearchedUser = () => {
    if (this.state.isSearchResultVisible) {
      return (
        <FlatList
          data={this.state.userData}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ isSearchResultVisible: false, sendPacUser: item.id });
              }}
            >
              <Text>{item.id}</Text>
            </TouchableWithoutFeedback>
          )}
          style={{ maxHeight: 180 }}
        />
      );
    }
  };

  onBlurTextInput = () => {
    const { userData, sendPacUser } = this.state;
    const found = userData.some((usr) => usr.id === sendPacUser);

    if (!found) {
      this.setState({ sendPacUser: null });
    }
    this.setState({ isSearchResultVisible: false });
  };

  onFocusTextInput = () => {
    this.setState({ isSearchResultVisible: true });
  };

  render() {
    return (
      <>
        <MainHeader title={'Send PAC'} withBack />
        <Screen style={{ margin: 16 }}>
          <DismissKeyboard>
            <Text style={_styles.textTo}>To</Text>
            <TextInput
              style={_styles.textInput}
              autoCorrect={false}
              value={this.state.sendPacUser}
              autoCapitalize={'none'}
              selectionColor={Colors['white-1']}
              placeholder={'Search User'}
              placeholderTextColor={Colors['white-3']}
              onChangeText={this.onChangeSearchUser}
              onBlur={this.onBlurTextInput}
              onFocus={this.onFocusTextInput}
            />
            <View>
              <Text style={_styles.textAmount}>Amount</Text>
              <TextInput
                style={_styles.textInput}
                value={this.state.sendPacAmount}
                onChangeText={(text) => {
                  const number = text.replace(/[^0-9]/g, '');
                  this.setState({ sendPacAmount: number });
                }}
                keyboardType={'number-pad'}
                selectionColor={Colors['white-1']}
                placeholder={'Amount to send'}
                placeholderTextColor={Colors['white-3']}
              />
              <View style={_styles.listUserView}>{this.listSearchedUser()}</View>
            </View>
          </DismissKeyboard>
        </Screen>
      </>
    );
  }
}

export default WalletTransaction;

const _styles = StyleSheet.create({
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: 20,
    padding: 12,
    backgroundColor: Colors['dark-8'],
  },
  textTo: {
    fontFamily: 'Inconsolata-SemiBold',
    color: Colors['white-1'],
    fontSize: 18,
    marginBottom: 8,
  },
  textAmount: {
    fontFamily: 'Inconsolata-SemiBold',
    color: Colors['white-1'],
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  listUserView: {
    position: 'absolute',
    backgroundColor: Colors['dark-8'],
    width: '100%',
    marginTop: 8,
    borderRadius: 4,
  },
});
