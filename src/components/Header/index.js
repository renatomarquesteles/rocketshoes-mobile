import React from 'react';
import {connect} from 'react-redux';

import {
  BasketContainer,
  CartIcon,
  Container,
  ItemCount,
  Logo,
  Wrapper,
} from './styles';

function Header({navigation, cartSize}) {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <CartIcon />
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
