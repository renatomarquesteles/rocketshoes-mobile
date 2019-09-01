import React from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableOpacity>
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <CartIcon />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  cartSize: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);
