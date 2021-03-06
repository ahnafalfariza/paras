import React, { Component } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { connect } from 'react-redux';
import Axios from 'axios';

import Screen from '../../component/Common/Screen';
import MainHeader from '../../component/Header/MainHeader';
import RoutesName from '../../utils/RoutesName';
import assetSvg from '../../assets/svg/svg';
import Colors from '../../utils/color';
import { USER_MEMENTO, SEARCH_MEMENTO } from '../../utils/api';
import MementoListSquare from '../../component/NewPost/MementoListSquare';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import { ResponsiveFont } from '../../utils/ResponsiveFont';

class ChooseMementoScreen extends Component {
  state = {
    userMemento: [],
    searchQuery: '',
    searchMemento: [],
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserMemento();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getSearchMemento = (query) => {
    Axios.get(SEARCH_MEMENTO(query))
      .then((res) =>
        this.setState({
          searchMemento: res.data.data.filter((memento) => memento.type === 'public'),
        }),
      )
      .catch((err) => console.log(err));
  };

  getUserMemento = () => {
    Axios.get(USER_MEMENTO(this.props.profileData.id))
      .then((res) => this.setState({ userMemento: res.data.data }))
      .catch((err) => console.log(err));
  };

  render() {
    const { userMemento, searchMemento, searchQuery } = this.state;

    return (
      <>
        <MainHeader
          title={'Choose a Memento'}
          leftComponent={'close'}
          rightComponent={
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate(RoutesName.NewMemento)}
            >
              <SvgXml xml={assetSvg.bottomTab.NewPostTab} width="26" height="26" />
            </TouchableWithoutFeedback>
          }
        />
        <Screen>
          <DismissKeyboard>
            <MementoListSquare
              header={
                <>
                  <TextInput
                    style={_styles.textInput}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    selectionColor={Colors['white-1']}
                    placeholder={'Search'}
                    returnKeyType={'search'}
                    onChangeText={(text) => {
                      this.getSearchMemento(text);
                      this.setState({ searchQuery: text });
                    }}
                    placeholderTextColor={Colors['white-3']}
                  />
                  <Text style={_styles.title}>
                    {searchQuery === '' ? 'My Memento' : 'Search Memento'}
                  </Text>
                </>
              }
              list={searchQuery === '' ? userMemento : searchMemento}
            />
          </DismissKeyboard>
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
});

export default connect(mapStateToProps)(ChooseMementoScreen);

const _styles = StyleSheet.create({
  textInput: {
    fontFamily: 'Inconsolata-Regular',
    color: Colors['white-1'],
    borderRadius: 4,
    fontSize: ResponsiveFont(16),
    padding: 12,
    marginBottom: 16,
    backgroundColor: Colors['dark-8'],
  },
  title: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: ResponsiveFont(16),
    marginBottom: 4,
  },
});
