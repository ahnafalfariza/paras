import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import MainHeader from '../../component/Header/MainHeader';
import PostList from '../../component/Post/Post';
import Screen from '../../component/Common/Screen';
import { POST_BY_ID } from '../../utils/api';

const SinglePostScreen = ({ route }) => {
  const { postId } = route.params;
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    Axios.get(POST_BY_ID(postId))
      .then((res) => setPostData(res.data.data))
      .catch((err) => console.log(err));
  }, [postId]);

  return (
    <>
      <MainHeader title={'Post'} leftComponent={'back'} />
      <Screen>
        <PostList list={postData} />
      </Screen>
    </>
  );
};

export default SinglePostScreen;
