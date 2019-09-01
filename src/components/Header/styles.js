import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

import logo from '../../assets/logo.png';

export const BasketContainer = styled.TouchableOpacity`
  height: 24;
  width: 24;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const CartIcon = styled(Icon).attrs({
  name: 'shopping-basket',
  color: colors.light,
  size: 26,
})``;

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

export const ItemCount = styled.Text`
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: ${colors.primary};
  color: #fff;
  font-size: 12px;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const Wrapper = styled.SafeAreaView`
  flex: 0.1;
  background: ${colors.dark};
  flex-direction: row;
`;
