import React, { Component, createRef } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

import Colors from '../../utils/color';
import { SCREEN_WIDTH } from '../../utils/constant';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import RoutesName from '../../utils/RoutesName';
import { getImageUrl } from '../../utils/image';
import assetSvg from '../../assets/svg/svg';
import NewPostModal from '../../component/Modal/NewPost';
import TextContent from '../../component/Post/Content/TextContent';
import ChooseContent from '../../component/NewPost/ChooseContent';
import MainButton from '../../component/Common/MainButton';

class NewPostScreen extends Component {
  constructor(props) {
    super(props);
    this.swiper = createRef();
    this.state = {
      currentPage: 0,
      showModal: null,
      contentList: [
        // { type: 'text', body: 'ini text yg pertama' },
        { type: null, body: null },
        { type: null, body: null },
      ],
    };
  }

  dismissModal = () => {
    this.setState({ showModal: null });
  };

  onPressAddPage = () => {
    const { contentList } = this.state;
    this.setState((prevState) => ({
      contentList: [...prevState.contentList, { type: null, body: null }],
    }));
    setTimeout(() => {
      this.swiper.scrollTo(contentList.length);
    }, 0);
  };

  renderSelectMemento = () => {
    const { mementoData } = this.props.route.params;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.navigate(RoutesName.ChooseMemento)}
      >
        <View>
          <Text style={_styles.defaultText}>Choose a memento</Text>
          {mementoData ? (
            <View style={_styles.containerView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  source={{ uri: getImageUrl(mementoData.img) }}
                  style={_styles.mementoImage}
                />
                <Text style={_styles.mementoText}>{mementoData.id}</Text>
              </View>
            </View>
          ) : (
            <View style={_styles.defaultMementoView}>
              <Text style={_styles.defaultText}>{'Memento...'}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderChooseContent = () => {
    const { contentList, currentPage } = this.state;
    return (
      <View>
        <Text style={_styles.defaultText}>Content</Text>
        <View
          style={{
            height: SCREEN_WIDTH - 32,
            aspectRatio: 1,
            borderRadius: 8,
            backgroundColor: Colors['dark-8'],
            overflow: 'hidden',
            marginVertical: 16,
          }}
        >
          <Swiper
            showsButtons={true}
            ref={(ref) => (this.swiper = ref)}
            nextButton={<SvgXml xml={assetSvg.postContent.next} width="28" height="28" />}
            prevButton={<SvgXml xml={assetSvg.postContent.prev} width="28" height="28" />}
            onIndexChanged={(index) => this.setState({ currentPage: index })}
            autoplay={false}
            // loadMinimal={true}
            // loadMinimalSize={contentList.length}
            loop={false}
            showsPagination={false}
          >
            {contentList.map((content, index) => {
              if (content.type === 'text') {
                return <TextContent key={index} body={content.body} />;
              } else {
                return (
                  <ChooseContent
                    key={index}
                    canDelete={contentList.length > 1}
                    onPress={(choosen) => this.setState({ showModal: choosen })}
                  />
                );
              }
            })}
          </Swiper>
        </View>
        <Text style={[_styles.defaultText, { textAlign: 'center' }]}>
          {`${currentPage + 1}/${contentList.length}`}
        </Text>
        <MainButton
          title={'Add Page'}
          containerStyle={{ alignSelf: 'center', marginTop: 24 }}
          onPress={this.onPressAddPage}
        />
        <NewPostModal
          type={this.state.showModal}
          onDismiss={this.dismissModal}
          onComplete={(data) => {
            console.log('datanya', data);
            this.dismissModal();
          }}
        />
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
        </Screen>
      </>
    );
  }
}

export default NewPostScreen;

const _styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
  defaultMementoView: {
    backgroundColor: Colors['dark-8'],
    padding: 14,
    marginVertical: 16,
    borderRadius: 8,
  },
  containerView: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors['dark-8'],
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginVertical: 16,
  },
  mementoImage: {
    height: 28,
    width: 28,
    marginRight: 8,
  },
  mementoText: {
    fontFamily: 'Inconsolata-Bold',
    color: Colors['white-1'],
    fontSize: 18,
  },
});
