import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Colors from '../../utils/color';
import { SCREEN_WIDTH } from '../../utils/constant';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RoutesName from '../../utils/RoutesName';

class NewPostScreen extends Component {
  renderSelectMemento = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.navigate(RoutesName.ChooseMemento)}
      >
        <View>
          <Text style={_styles.text}>Choose a memento</Text>
          <View
            style={{
              backgroundColor: Colors['dark-12'],
              padding: 14,
              marginVertical: 16,
              borderRadius: 8,
            }}
          >
            <Text style={_styles.text}>Memento...</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderChooseContent = () => {
    return (
      <View>
        <Text style={_styles.text}>Content</Text>
        <View
          style={{
            backgroundColor: Colors['dark-12'],
            marginVertical: 16,
            width: SCREEN_WIDTH - 32,
            aspectRatio: 1,
            borderRadius: 8,
          }}
        >
          <></>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <MainHeader title={'New Post'} leftComponent={'back'} />
        <Screen style={{ padding: 16 }}>
          {this.renderSelectMemento()}
          {this.renderChooseContent()}
          <View>
            <Text style={_styles.text}>Add Page</Text>
          </View>
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
