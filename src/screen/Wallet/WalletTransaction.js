import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, FlatList } from 'react-native';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import Colors from '../../utils/color';
import { SEARCH_USER_SEND } from '../../utils/api';
import DismissKeyboard from '../Common/DismissKeyboard';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class WalletTransaction extends Component {
  state = {
    pacAmount: null,
    userData: [],
    choosenUser: null,
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

  listSearchedUser = () => {
    if (this.state.isSearchResultVisible) {
      return (
        <FlatList
          data={this.state.userData}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ isSearchResultVisible: false });
              }}
            >
              <Text>{item.id}</Text>
            </TouchableWithoutFeedback>
          )}
          style={{ zIndex: 1, maxHeight: 150 }}
        />
      );
    }
  };

  render() {
    return (
      <>
        <MainHeader title={'Send PAC'} withBack />
        <Screen style={{ margin: 16 }}>
          <DismissKeyboard onPress={() => this.setState({ isSearchResultVisible: false })}>
            <View style={{ flex: 1 }}>
              <Text style={_styles.textTo}>To</Text>
              <TextInput
                style={_styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                selectionColor={Colors['white-1']}
                placeholder={'Search User'}
                placeholderTextColor={Colors['white-3']}
                onChangeText={this.searchUser}
                onFocus={() => this.setState({ isSearchResultVisible: true })}
              />
              <View>
                <Text style={_styles.textAmount}>Amount</Text>
                <TextInput
                  style={_styles.textInput}
                  value={this.state.pacAmount}
                  onChangeText={(text) => {
                    const number = text.replace(/[^0-9]/g, '');
                    this.setState({ pacAmount: number });
                  }}
                  keyboardType={'number-pad'}
                  selectionColor={Colors['white-1']}
                  placeholder={'Amount to send'}
                  placeholderTextColor={Colors['white-3']}
                />
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: Colors['white-1'],
                    width: '100%',
                  }}
                >
                  {this.listSearchedUser()}
                </View>
              </View>
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
});
