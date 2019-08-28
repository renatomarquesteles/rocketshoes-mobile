import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Cart,
      Home,
    },
    {
      defaultNavigationOptions: navigation => ({
        header: <Header {...navigation} />,
      }),
      cardStyle: {
        backgroundColor: '#191910',
      },
    },
  ),
);

export default Routes;
