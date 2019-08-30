import React from 'react';
import {Image} from 'react-native';

import shoppingBasket from '../../assets/shopping-basket.png';
import {BasketContainer, Container, ItemCount, Logo, Wrapper} from './styles';

export default function Header({navigation}) {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Image style={{width: 24, height: 24}} source={shoppingBasket} />
          <ItemCount>{0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}
