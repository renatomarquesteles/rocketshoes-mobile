import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import {formatPrice} from '../../util/format';

import {
  AddButton,
  AddButtonText,
  Background,
  CartIcon,
  Container,
  Product,
  ProductAmount,
  ProductAmountText,
  ProductImage,
  ProductPrice,
  ProductTitle,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((amountList, product) => {
      amountList[product.id] = product.amount;

      return amountList;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderProduct({item}) {
    return (
      <Product key={item.id}>
        <ProductImage source={{uri: item.image}} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => handleAddProduct(item.id)}>
          <ProductAmount>
            <CartIcon />
            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    );
  }

  return (
    <Background>
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={amount}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
        />
      </Container>
    </Background>
  );
}

Home.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    priceFormatted: PropTypes.string,
  }).isRequired,
};
