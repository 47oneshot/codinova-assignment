/**
 * @format
 */
import React from 'react';
import {AppRegistry,StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/store/store';

const ReduxAppWrapper = () => {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={'#fff'}
        translucent
        barStyle="dark-content"
      />
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxAppWrapper);
