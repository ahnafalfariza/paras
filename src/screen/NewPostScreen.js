import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../component/Screen';
import Colors from '../helper/color';
import MainHeader from '../component/MainHeader';

class NewPostScreen extends Component {
  renderSelectMemento = () => {
    return (
      <View>
        <Text style={_styles.text}>Choose a memento</Text>
      </View>
    );
  };

  renderChooseContent = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <Text style={_styles.text}>Content</Text>
      </View>
    );
  };

  render() {
    return (
      <>
        <MainHeader title={'New Post'} withBack />
        <Screen style={{ padding: 16 }}>
          {this.renderSelectMemento()}
          {this.renderChooseContent()}
        </Screen>
      </>
    );
  }
}

export default NewPostScreen;

const _styles = StyleSheet.create({
  text: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
});
