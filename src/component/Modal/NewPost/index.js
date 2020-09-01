import React from 'react';

import ContentTextModal from './ContentTextModal';
import ContentLinkModal from './ContentLinkModal';

const NewPostModal = ({ type, onDismiss, onComplete }) => {
  switch (type) {
    case 'text':
      return <ContentTextModal onDismiss={onDismiss} onComplete={onComplete} />;
    case 'url':
      return <ContentLinkModal />;
    default:
      return null;
  }
};

export default NewPostModal;
