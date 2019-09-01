import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

export const Container = styled.View`
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  margin: 15px;
`;

export const EmptyCartIcon = styled(Icon).attrs({
  name: 'remove-shopping-cart',
  color: '#999',
  size: 52,
})`
  align-self: center;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
`;

export const Order = styled.TouchableOpacity`
  background: ${colors.primary};
  padding: 12px;
  border-radius: 4px;
`;

export const OrderText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export const Product = styled.View``;

export const ProductAddIcon = styled(Icon).attrs({
  name: 'add-circle-outline',
  color: colors.primary,
  size: 24,
})``;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
`;

export const ProductControls = styled.View`
  flex-direction: row;
  align-items: center;
  background: #eee;
  padding: 8px;
  border-radius: 4px;
`;

export const ProductControlButton = styled.TouchableOpacity``;

export const ProductDelete = styled.TouchableOpacity`
  padding: 6px;
`;

export const ProductDeleteIcon = styled(Icon).attrs({
  name: 'delete-forever',
  color: colors.primary,
  size: 24,
})``;

export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
`;

export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const ProductRemoveIcon = styled(Icon).attrs({
  name: 'remove-circle-outline',
  color: colors.primary,
  size: 24,
})``;

export const Products = styled.View``;

export const ProductSubtotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

export const ProductTitle = styled.Text``;

export const TotalAmount = styled.Text`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
`;

export const TotalContainer = styled.View`
  margin-top: 30px;
`;

export const TotalText = styled.Text`
  text-align: center;
  color: #999;
  font-weight: bold;
`;

export const Wrapper = styled.ScrollView``;
