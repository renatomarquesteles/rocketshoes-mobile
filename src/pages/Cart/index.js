import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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

function Cart({products, total, removeFromCart, updateAmountRequest}) {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  renderProduct = ({item}) => {
    return (
      <Product>
        <ProductInfo>
          <ProductImage source={{uri: item.image}} />
          <ProductDetails>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
          </ProductDetails>
          <ProductDelete onPress={() => removeFromCart(item.id)}>
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
  };

  return (
    <Container>
      {products.length ? (
        <Wrapper>
          <Products>
            <FlatList
              data={products}
              keyExtractor={item => String(item.id)}
              renderItem={this.renderProduct}
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      subtotal: PropTypes.string,
    })
  ).isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
