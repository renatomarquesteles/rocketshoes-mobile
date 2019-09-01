import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Header from './components/Header';

import colors from './styles/colors';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        header: <Header navigation={navigation} />,
      }),
      headerMode: 'float',
      cardStyle: {
        backgroundColor: colors.dark,
      },
    }
  )
);

export default Routes;
