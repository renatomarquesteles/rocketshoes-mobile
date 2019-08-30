import React from 'react';
import {View, Text} from 'react-native';

// import { Container } from './styles';

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

Home.navigationOptions = {
  title: 'Home',
};
