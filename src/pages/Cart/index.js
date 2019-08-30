import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image} from 'react-native';
import * as CartActions from '../../store/modules/cart/actions';

import {formatPrice} from '../../util/format';
import deleteForever from '../../assets/delete-forever.png';
import removeCircleOutline from '../../assets/remove-circle-outline.png';
import addCircleOutline from '../../assets/add-circle-outline.png';
import removeShoppingCart from '../../assets/remove-shopping-cart.png';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

function Cart({
  navigation,
  products,
  total,
  removeFromCart,
  updateAmountRequest,
}) {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  return (
    <Container>
      {products.length ? (
        <>
          <Products>
            {products.map(product => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage source={{uri: product.image}} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete onPress={() => removeFromCart(product.id)}>
                    <Image
                      style={{width: 24, height: 24}}
                      source={deleteForever}
                    />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(product)}>
                    <Image
                      style={{width: 24, height: 24}}
                      source={removeCircleOutline}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton onPress={() => increment(product)}>
                    <Image
                      style={{width: 24, height: 24}}
                      source={addCircleOutline}
                    />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Image style={{width: 64, height: 64}} source={removeShoppingCart} />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}

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
