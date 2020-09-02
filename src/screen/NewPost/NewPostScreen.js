import React, { Component, createRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Axios from 'axios';

import Colors from '../../utils/color';
import { SCREEN_WIDTH } from '../../utils/constant';
import MainHeader from '../../component/Header/MainHeader';
import Screen from '../../component/Common/Screen';
import assetSvg from '../../assets/svg/svg';
import NewPostModal from '../../component/Modal/NewPost';
import TextContent from '../../component/Post/Content/TextContent';
import ChooseContent from '../../component/NewPost/ChooseContent';
import MainButton from '../../component/Common/MainButton';
import LinkContent from '../../component/Post/Content/LinkContent';
import ImageContent from '../../component/Post/Content/ImageContent';
import ChooseMemento from '../../component/NewPost/ChooseMemento';
import { CREATE_POST } from '../../utils/api';

const ContentDimension = SCREEN_WIDTH - 32;

class NewPostScreen extends Component {
  constructor(props) {
    super(props);
    this.scroll = createRef();
    this.state = {
      mementoData: null,
      currentPage: 0,
      showModal: null,
      contentList: [{ type: null, body: null }],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      const { mementoData } = this.props.route.params;
      this.setState({ mementoData });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  validateCreate = () => {
    const { contentList, mementoData } = this.state;
    const contentNotEmpty = contentList.filter((content) => content.type !== null).length !== 0;

    if (mementoData !== null && contentNotEmpty) {
      return true;
    }
    return false;
  };

  uploadPost = () => {
    const { mementoData, contentList } = this.state;
    const filteredContent = contentList.filter((content) => content.type !== null);

    this.setState({ isLoading: true });
    Axios.post(CREATE_POST, {
      mementoId: mementoData.id,
      contentList: filteredContent,
    })
      .then((res) => {
        console.log('berhasil', res.data.data);
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

  dismissModal = () => {
    this.setState({ showModal: null });
  };

  onDeleteContent = () => {
    const { contentList, currentPage } = this.state;
    let updatedContent = Object.create(contentList);
    this.scrollTo(currentPage === 0 ? currentPage + 1 : currentPage - 1);
    updatedContent.splice(currentPage, 1);
    setTimeout(() => {
      this.setState({ contentList: updatedContent });
    }, 500);
  };

  onPressChooseContent = (choosen) => {
    this.setState({ showModal: choosen });
  };

  onIndexChanged = ({ nativeEvent }) => {
    const indexSlide = Math.round(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (indexSlide !== this.state.currentPage) {
      this.setState({ currentPage: indexSlide });
    }
  };

  onPressAddPage = () => {
    const { contentList } = this.state;
    this.setState((prevState) => ({
      contentList: [...prevState.contentList, { type: null, body: null }],
    }));
    setTimeout(() => {
      this.scrollTo(contentList.length);
    }, 0);
  };

  onCompleteContent = (data) => {
    const { contentList, currentPage } = this.state;

    contentList[currentPage] = data;
    this.setState({ contentList });
    this.dismissModal();
  };

  scrollTo = (index) => {
    this.scroll.scrollTo({ x: ContentDimension * index, y: 0, animated: true });
  };

  nextPrevButton = () => {
    const { contentList, currentPage } = this.state;
    return (
      <>
        {currentPage !== 0 && (
          <View style={_styles.paginationButton}>
            <TouchableNativeFeedback onPress={() => this.scrollTo(currentPage - 1)}>
              <SvgXml xml={assetSvg.postContent.prev} width="28" height="28" />
            </TouchableNativeFeedback>
          </View>
        )}
        {currentPage !== contentList.length - 1 && (
          <View style={[_styles.paginationButton, { right: 0 }]}>
            <TouchableNativeFeedback onPress={() => this.scrollTo(currentPage + 1)}>
              <SvgXml xml={assetSvg.postContent.next} width="28" height="28" />
            </TouchableNativeFeedback>
          </View>
        )}
      </>
    );
  };

  editDeleteButton = () => {
    const { contentList, currentPage } = this.state;
    return (
      <View style={{ position: 'absolute', right: 0, margin: 12, flexDirection: 'row' }}>
        <TouchableNativeFeedback onPress={() => console.log('edit')}>
          <SvgXml xml={assetSvg.newPost.edit} width="36" height="36" />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            contentList[currentPage] = { type: null, body: null };
            this.setState({ contentList });
          }}
        >
          <SvgXml xml={assetSvg.newPost.delete} width="36" height="36" style={{ marginLeft: 12 }} />
        </TouchableNativeFeedback>
      </View>
    );
  };

  renderChooseContent = () => {
    const { contentList, currentPage } = this.state;
    return (
      <>
        <Text style={_styles.defaultText}>Content</Text>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: Colors['dark-8'],
            overflow: 'hidden',
            marginVertical: 16,
          }}
        >
          <ScrollView
            ref={(ref) => (this.scroll = ref)}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={this.onIndexChanged}
          >
            {contentList.map((content, index) => {
              return (
                <View key={index} style={{ flex: 1, width: ContentDimension, aspectRatio: 1 }}>
                  {content.type === 'text' && <TextContent body={content.body} />}
                  {content.type === 'url' && <LinkContent body={content.body} disabled />}
                  {content.type === 'img' && <ImageContent body={content.body} />}
                  {content.type === null ? (
                    <ChooseContent
                      canDelete={contentList.length > 1}
                      onPress={this.onPressChooseContent}
                      onPressDelete={this.onDeleteContent}
                    />
                  ) : (
                    this.editDeleteButton()
                  )}
                </View>
              );
            })}
          </ScrollView>
          {this.nextPrevButton()}
        </View>
        <Text style={[_styles.defaultText, { textAlign: 'center' }]}>
          {`${currentPage + 1}/${contentList.length}`}
        </Text>
      </>
    );
  };

  render() {
    const { mementoData, contentList, isLoading } = this.state;
    return (
      <>
        <MainHeader
          title={'New Post'}
          leftComponent={'back'}
          rightComponent={() => (
            <TouchableWithoutFeedback onPress={this.uploadPost} disabled={!this.validateCreate()}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <SvgXml
                  xml={assetSvg.header.check}
                  width="24"
                  height="24"
                  style={{ opacity: !this.validateCreate() ? 0.7 : 1 }}
                />
              )}
            </TouchableWithoutFeedback>
          )}
        />
        <Screen style={{ padding: 16 }}>
          <ChooseMemento mementoData={mementoData} />
          {this.renderChooseContent()}
          <MainButton
            title={'Add Page'}
            containerStyle={{ alignSelf: 'center', marginTop: 24 }}
            disabled={contentList.length === 8}
            onPress={this.onPressAddPage}
          />
          <NewPostModal
            type={this.state.showModal}
            onDismiss={this.dismissModal}
            onComplete={this.onCompleteContent}
          />
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
  paginationButton: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    marginHorizontal: 10,
  },
});
