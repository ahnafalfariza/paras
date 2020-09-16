import React from 'react';
import WebScreen from '../screen/Web';

const WebNavigator = ({ route }) => {
  const { title, url } = route.params;

  return (
    <WebScreen title={title} url={url} />
  );
};

export default WebNavigator;