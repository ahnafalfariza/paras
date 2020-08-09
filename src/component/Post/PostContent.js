import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

import LinkContent from './Content/LinkContent';
import ImageContent from './Content/ImageContent';
import TextContent from './Content/TextContent';
import { SCREEN_WIDTH } from '../../utils/constant';

const PostContent = ({ contentList }) => {
  return (
    <View style={{ height: SCREEN_WIDTH - 32 }}>
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

export default PostContent;
