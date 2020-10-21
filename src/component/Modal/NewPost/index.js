import React from 'react';

import ContentTextModal from './ContentTextModal';
import ContentLinkModal from './ContentLinkModal';
import ContentImageModal from './ContentImageModal';

const NewPostModal = (props) => {
  switch (props.type) {
    case 'text':
      return <ContentTextModal {...props} />;
    case 'url':
      return <ContentLinkModal {...props} />;
    case 'img':
      return <ContentImageModal {...props} />;
    default:
      return null;
  }
};

export default NewPostModal;
