import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import './config/ReactotronConfig';

import store from './store';
import Routes from './routes';
import NavigationService from './services/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Routes
        ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
      />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
