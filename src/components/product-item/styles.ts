import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

export const ProductCard = styled(View)`
  border: 1px solid black;
  margin-bottom: 24px;
`;

export const ProductName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const ProductImage = styled(Image)`
  height: 120px;
`;

export const ProductPrice = styled(Text)`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 12px;
`;

export const ProductQuantityInBasket = styled(Text)`
  font-size: 16px;
  text-align: right;
`;
