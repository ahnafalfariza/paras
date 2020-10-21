import React from 'react';
import { WebView } from 'react-native-webview';

const Web = ({ url }) => {
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default Web;
