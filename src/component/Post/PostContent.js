import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

import LinkContent from './Content/LinkContent';
import ImageContent from './Content/ImageContent';
import TextContent from './Content/TextContent';
import { SCREEN_WIDTH } from '../../utils/constant';
import { SvgXml } from 'react-native-svg';
import Colors from '../../utils/color';
import assetSvg from '../../assets/svg/svg';

const PostContent = ({ contentList }) => {
  return (
    <View style={{ height: SCREEN_WIDTH - 32 }}>
      <Swiper
        showsButtons={true}
        nextButton={<SvgXml xml={assetSvg.postContent.next} width="28" height="28" />}
        prevButton={<SvgXml xml={assetSvg.postContent.prev} width="28" height="28" />}
        autoplay={false}
        loop={false}
        showsPagination={true}
        dotStyle={{
          width: 10,
          height: 2,
          borderRadius: 0,
          backgroundColor: Colors['white-2'],
        }}
        activeDotStyle={{
          width: 12,
          height: 3,
          borderRadius: 0,
          backgroundColor: Colors['white-1'],
        }}
        paginationStyle={{ position: 'absolute', bottom: -20 }}
      >
        {contentList.map(({ type, body }, index) => {
          if (type === 'text') {
            return <TextContent key={index} body={body} />;
          } else if (type === 'img') {
            return <ImageContent key={index} body={body} />;
          } else if (type === 'url') {
            return <LinkContent key={index} body={body} />;
          }
        })}
      </Swiper>
    </View>
  );
};

export default PostContent;
