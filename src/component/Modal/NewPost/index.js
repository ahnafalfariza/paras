import React from 'react';

import ContentTextModal from './ContentTextModal';
import ContentLinkModal from './ContentLinkModal';

const NewPostModal = (props) => {
  switch (props.type) {
    case 'text':
      return <ContentTextModal {...props} />;
    case 'url':
      return <ContentLinkModal {...props} />;
    default:
      return null;
  }
};

export default NewPostModal;
