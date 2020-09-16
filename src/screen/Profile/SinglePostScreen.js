import React from 'react';
import MainHeader from '../../component/Header/MainHeader';
import PostList from '../../component/Post/Post';
import Screen from '../../component/Common/Screen';

const data = {
  _id: '5f60450f6cff2b38339fc285',
  contentList: [{ body: 'lalalala', type: 'text' }],
  createdAt: 1600144655563,
  id: 'TUZbsmHlV',
  memento: {
    _id: '5f5a01f61695be7ee4fac557',
    category: 'design',
    createdAt: '1599734259765544415',
    desc: '',
    id: 'kerenabis.design',
    img: { type: 'ipfs', url: 'QmYqaLrzfy5q36kphw3CCzLgkcpfPfGkZCQ326oKYde9to' },
    isArchive: false,
    name: 'kerenabis',
    owner: 'mantap212.paras.testnet',
    type: 'public',
    updatedAt: 1600144655564,
    user: null,
  },
  mementoId: 'kerenabis.design',
  originalId: 'TUZbsmHlV',
  owner: 'mantap212.paras.testnet',
  user: {
    _id: '5f59cdd61695be7ee4fac552',
    bio: '',
    createdAt: '1599720915235118849',
    id: 'mantap212.paras.testnet',
    imgAvatar: { type: 'ipfs', url: 'QmYeGSYCn14ppxnP26D5p9W8NRgPEBqkfkYfoAULCfKhyE' },
  },
};

const SinglePostScreen = (route) => {
  // const { postData } = route.params;
  return (
    <>
      <MainHeader title={'Post'} leftComponent={'back'} />
      <Screen>
        <PostList list={[data]} />
      </Screen>
    </>
  );
};

export default SinglePostScreen;
