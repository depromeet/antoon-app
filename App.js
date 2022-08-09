import React, {useRef} from 'react';
import {WebView} from 'react-native-webview';
import type {Node} from 'react';
import {Platform, Dimensions} from 'react-native';

const WebviewContainer = ({handleSetRef, handleEndLoading}) => {
  const os = Platform.OS;

  const isAndroid = os === 'android';

  const uri = 'https://antoon.fun';
  const devUri = isAndroid ? 'http://10.0.2.2:3000' : 'http://localhost:3000/';

  const handleOnMessage = ({nativeEvent: {data}}) => {
    console.log(data);
  };

  const marginTop = isAndroid ? 0 : 25;

  return (
    <>
      <WebView
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        ref={handleSetRef}
        source={{uri}}
        // source={{uri: devUri}}
        style={{
          marginTop,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    </>
  );
};

const App: () => Node = () => {
  let webviewRef = useRef();

  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const handleEndLoading = e => {
    console.log('handleEndLoading');
    webviewRef.postMessage('Finish load and send message to webview');
  };

  return (
    <WebviewContainer
      webviewRef={webviewRef}
      handleSetRef={handleSetRef}
      handleEndLoading={handleEndLoading}
    />
  );
};

export default App;
