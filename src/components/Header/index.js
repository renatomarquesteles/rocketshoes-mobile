import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';

import shoppingBasket from '../../assets/shopping-basket.png';
import {BasketContainer, Container, ItemCount, Logo, Wrapper} from './styles';

function Header({navigation, cartSize}) {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Image style={{width: 24, height: 24}} source={shoppingBasket} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);
