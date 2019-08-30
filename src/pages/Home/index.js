import React, {Component} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import {formatPrice} from '../../util/format';
import shoppingBasket from '../../assets/shopping-basket.png';

import {
  Background,
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
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
            <Image style={{width: 20, height: 20}} source={shoppingBasket} />
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
