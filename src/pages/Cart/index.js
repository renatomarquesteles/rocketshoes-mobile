import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import {formatPrice} from '../../util/format';

import {
  Container,
  EmptyCartIcon,
  EmptyContainer,
  EmptyText,
  Order,
  OrderText,
  Product,
  ProductAddIcon,
  ProductAmount,
  ProductControls,
  ProductControlButton,
  ProductDelete,
  ProductDeleteIcon,
  ProductDetails,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ProductRemoveIcon,
  Products,
  ProductSubtotal,
  ProductTitle,
  TotalAmount,
  TotalContainer,
  TotalText,
  Wrapper,
} from './styles';

export default function Cart() {
  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
      priceFormatted: formatPrice(product.price),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function renderProduct({item}) {
    return (
      <Product>
        <ProductInfo>
          <ProductImage source={{uri: item.image}} />
          <ProductDetails>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
          </ProductDetails>
          <ProductDelete
            onPress={() => dispatch(CartActions.removeFromCart(item.id))}>
            <ProductDeleteIcon />
          </ProductDelete>
        </ProductInfo>
        <ProductControls>
          <ProductControlButton onPress={() => decrement(item)}>
            <ProductRemoveIcon />
          </ProductControlButton>
          <ProductAmount value={String(item.amount)} />
          <ProductControlButton onPress={() => increment(item)}>
            <ProductAddIcon />
          </ProductControlButton>
          <ProductSubtotal>{item.subtotal}</ProductSubtotal>
        </ProductControls>
      </Product>
    );
  }

  return (
    <Container>
      {products.length ? (
        <Wrapper>
          <Products>
            <FlatList
              data={products}
              keyExtractor={item => String(item.id)}
              renderItem={renderProduct}
            />
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </Wrapper>
      ) : (
        <EmptyContainer>
          <EmptyCartIcon />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}

Cart.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    priceFormatted: PropTypes.string,
    id: PropTypes.number,
    amount: PropTypes.number,
    subtotal: PropTypes.string,
  }).isRequired,
};
