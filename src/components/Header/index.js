import React from 'react';
import {useSelector} from 'react-redux';
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

export default function Header({navigation}) {
  const cartSize = useSelector(state => state.cart.length);

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
};
