import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

import Colors from '../../utils/color';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import DismissKeyboard from '../../component/Common/DismissKeyboard';

class NewMementoScreen extends Component {
  state = {
    name: null,
    category: null,
  };

  render() {
    const { name, category } = this.state;
    return (
      <>
        <MainHeader title={'New Memento'} leftComponent={'close'} />
        <Screen style={{ padding: 16 }}>
          <DismissKeyboard>
            <View>
              <Text style={_styles.textTitle}>Create Memento</Text>
              <Text style={_styles.textMemento}>
                {`${name ? name : '[name]'}.${category ? category : '[domain]'}`}
              </Text>
              <Text style={_styles.textPlaceholder}>Name</Text>
              <TextInput
                style={_styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                selectionColor={Colors['white-1']}
                placeholder={'Memento Name'}
                placeholderTextColor={Colors['white-3']}
              />
              <Text style={_styles.textPlaceholder}>Category</Text>
              <TextInput
                style={_styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                selectionColor={Colors['white-1']}
                placeholder={'Memento Category'}
                placeholderTextColor={Colors['white-3']}
              />
              <Text style={_styles.textPlaceholder}>Type</Text>
              <TextInput
                style={_styles.textInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                selectionColor={Colors['white-1']}
                placeholder={'Memento Type'}
                placeholderTextColor={Colors['white-3']}
              />
            </View>
          </DismissKeyboard>
        </Screen>
      </>
    );
  }
}

export default NewMementoScreen;

const _styles = StyleSheet.create({
  textTitle: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  textMemento: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 24,
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  textPlaceholder: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
    marginBottom: 8,
  },
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: 20,
    padding: 12,
    marginBottom: 12,
    backgroundColor: Colors['dark-8'],
  },
});
