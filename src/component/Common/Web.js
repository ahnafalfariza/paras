import React from 'react';
import { WebView } from 'react-native-webview';

const Web = ({ url }) => {
  return (
    <WebView
      source={{ uri: url }}
      style={{
        height: 1000
      }}
    />
  );
}

export default Web;