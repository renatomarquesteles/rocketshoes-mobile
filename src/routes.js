import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      headerBackTitleVisible: false,
      defaultNavigationOptions: navigation => ({
        header: <Header {...navigation} />,
      }),
    },
  ),
);

export default Routes;
