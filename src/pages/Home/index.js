import React, {Component} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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

class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({products: data});
  };

  handleAddProduct = id => {
    const {addToCartRequest} = this.props;

    addToCartRequest(id);
  };

  renderProduct = ({item}) => {
    const {amount} = this.props;

    return (
      <Product key={item.id}>
        <ProductImage source={{uri: item.image}} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => this.handleAddProduct(item.id)}>
          <ProductAmount>
            <CartIcon />
            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    );
  };

  render() {
    const {products} = this.state;

    return (
      <Background>
        <Container>
          <FlatList
            horizontal
            data={products}
            extraData={this.props}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderProduct}
          />
        </Container>
      </Background>
    );
  }
}

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  amount: PropTypes.shape({
    amount: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
