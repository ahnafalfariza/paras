import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';

import Colors from '../../utils/color';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import DismissKeyboard from '../../component/Common/DismissKeyboard';
import DropDownInput from '../../component/Common/DropDownInput';
import { MEMENTO_DOMAIN, MEMENTO_TYPE } from '../../utils/MementoCreateHelper';
import MainTextInput from '../../component/Common/MainTextInput';
import { CREATE_MEMENTO } from '../../utils/api';
import assetSvg from '../../assets/svg/svg';
import RoutesName from '../../utils/RoutesName';

class NewMementoScreen extends Component {
  state = {
    name: null,
    category: null,
    type: null,
    isLoading: false,
  };

  createMemento = () => {
    const { name, category, type } = this.state;

    this.setState({ isLoading: true });
    Axios.post(CREATE_MEMENTO, {
      name: name,
      category: category,
      type: type.toLowerCase(),
    })
      .then(() => {
        this.props.navigation.navigate(RoutesName.ChooseMemento);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          err.response.data.message,
          [{ text: 'OK', onPress: () => this.setState({ isLoading: false }) }],
          { cancelable: false },
        );
      });
  };

  onChangeName = (text) => {
    this.setState({ name: text });
  };

  onChangeCategory = (text) => {
    let category = MEMENTO_DOMAIN.find(
      (memento) => memento.label.toLowerCase() === text.toLowerCase(),
    );
    category = category ? category.value : null;

    this.setState({ category });
  };

  onChangeTypeMemento = (text) => {
    let type = MEMENTO_TYPE.find((memento) => memento.toLowerCase() === text.toLowerCase());
    this.setState({ type });
  };

  validateName = () => {
    const { name } = this.state;
    if (name === null || name === '') {
      return true;
    }
    return name.match(/^[a-z0-9]{1,30}$/);
  };

  validateSubmit = () => {
    const { name, category, type } = this.state;
    if (!(name !== null && category !== null && type !== null && this.validateName())) {
      return true;
    }
    return false;
  };

  mementoDomain = () => {
    const { name, category, type } = this.state;

    if (type === 'Personal') {
      return `${name ? name : '[name]'}.${this.props.profileData.id.split('.')[0]}`;
    } else {
      return `${name ? name : '[name]'}.${category ? category : '[domain]'}`;
    }
  };

  render() {
    const { name, isLoading } = this.state;

    return (
      <>
        <MainHeader
          title={'New Memento'}
          leftComponent={'close'}
          rightComponent={() => (
            <TouchableWithoutFeedback
              onPress={() => this.createMemento()}
              disabled={this.validateSubmit()}
            >
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <SvgXml
                  xml={assetSvg.header.check}
                  width="24"
                  height="24"
                  fill={Colors['white-1']}
                  style={{ opacity: this.validateSubmit() ? 0.7 : 1 }}
                />
              )}
            </TouchableWithoutFeedback>
          )}
        />
        <Screen style={{ padding: 16 }}>
          <DismissKeyboard>
            <View>
              <Text style={_styles.textTitle}>Create Memento</Text>
              <Text style={_styles.textMemento}>{this.mementoDomain()}</Text>
              <Text style={_styles.textPlaceholder}>Name</Text>
              <MainTextInput
                value={name}
                onChangeText={this.onChangeName}
                placeholder={'Memento name'}
              />
              <View style={{ marginBottom: 12 }}>
                {!this.validateName() && (
                  <Text style={_styles.textWarning}>
                    Memento name must be lowercase and only contain letters and numbers
                  </Text>
                )}
              </View>
              <Text style={_styles.textPlaceholder}>Category</Text>
              <DropDownInput
                options={MEMENTO_DOMAIN.map((memento) => memento.label)}
                onChange={this.onChangeCategory}
                placeholder={'Memento Category'}
              />
              <Text style={_styles.textPlaceholder}>Type</Text>
              <DropDownInput
                options={MEMENTO_TYPE}
                onChange={this.onChangeTypeMemento}
                placeholder={'Memento Type'}
              />
            </View>
          </DismissKeyboard>
        </Screen>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profileData: state.user.profile,
});

export default connect(mapStateToProps)(NewMementoScreen);

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
  textWarning: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: 14,
    color: 'red',
    marginBottom: 2,
    marginLeft: 4,
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
