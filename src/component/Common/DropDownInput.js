import React from 'react';
import MainTextInput from './MainTextInput';
import { View, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../utils/constant';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const DropDownInput = ({}) => {
  return (
    <View style={{ zIndex: 1, marginBottom: 12 }}>
      <MainTextInput />
      <View
        style={{
          backgroundColor: '#ffffff',
          width: SCREEN_WIDTH - 32,
          height: 200,
          position: 'absolute',
          top: 50,
          marginTop: 4,
          zIndex: 1,
        }}
      >
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
      </View>
    </View>
  );
};

export default DropDownInput;
