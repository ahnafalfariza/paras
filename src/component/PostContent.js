import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../utils/color';
import FastImage from 'react-native-fast-image';
import { getImageUrl } from '../utils/image';
import { ScrollView } from 'react-native-gesture-handler';

const PostContent = ({ contentList }) => {
  return (
    <View style={{ height: Dimensions.get('window').width - 32 }}>
      <Swiper
        showsButtons={true}
        loop={false}
        showsPagination={true}
        renderPagination={(index, total, swiper) => {
          // console.log('index', index, total);
          // console.log('total', total);
        }}
      >
        {contentList.map(({ type, body }, index) => {
          if (type === 'text') {
            return <TextContent key={index} body={body} />;
          } else if (type === 'img') {
            return <ImageContent key={index} body={body} />;
          } else {
            return <LinkContent key={index} body={body} />;
          }
        })}
      </Swiper>
    </View>
  );
};

const TextContent = ({ body }) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, paddingVertical: 48 }}>
      <ScrollView
        style={{ paddingHorizontal: 48 }}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Text
          style={{ fontSize: 18, fontFamily: 'Inconsolata-SemiBold', color: Colors['white-1'] }}
        >
          {body}
        </Text>
      </ScrollView>
    </View>
  );
};

const ImageContent = ({ body }) => {
  const img = JSON.parse(body);
  return (
    <View style={{ flex: 1 }}>
      <FastImage style={{ width: '100%', height: '100%' }} source={{ uri: getImageUrl(img) }} />
    </View>
  );
};

const LinkContent = ({ body }) => {
  const link = JSON.parse(body);
  return (
    <View
      style={{
        flex: 1,
        margin: 6,
        backgroundColor: Colors['dark-2'],
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <View style={{ height: '60%' }}>
        <FastImage
          style={{ width: '100%', height: '100%', opacity: 0.5 }}
          source={{ uri: getImageUrl(link.img) }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ fontFamily: 'Inconsolata-ExtraBold', fontSize: 28, color: Colors['white-1'] }}
          >
            {link.title}
          </Text>
        </View>
      </View>
      <View style={{ height: '30%', padding: 12, justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily: 'Inconsolata-SemiBold',
            fontSize: 18,
            color: Colors['white-1'],
          }}
        >
          {link.desc}
        </Text>
      </View>
      <View
        style={{
          height: '10%',
          paddingHorizontal: 12,
          paddingBottom: 12,
          justifyContent: 'center',
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Inconsolata-SemiBold',
            fontSize: 18,
            color: Colors['white-1'],
            justifyContent: 'center',
          }}
        >
          {link.url}
        </Text>
      </View>
    </View>
  );
};

export default PostContent;
