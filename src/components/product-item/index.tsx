import React from 'react';
import { Button } from 'react-native';

import { Product } from 'api/product/product.model';

import * as S from 'components/product-item/styles';
import { useCallback } from 'react';

export interface ProductItemProps extends Product {
  quantityInBasket?: number;
  onAddBasket?: (id: number) => void;
  onPopFromBasket?: (id: number) => void;
  onRemoveFromBasket?: (id: number) => void;
}

const ProductItem = ({
  id,
  img,
  name,
  price,
  quantityInBasket,
  onAddBasket,
  onPopFromBasket,
  onRemoveFromBasket,
}: ProductItemProps) => {
  const addToBasket = useCallback(() => {
    onAddBasket?.(id);
  }, [id, onAddBasket]);

  const popFromBasket = useCallback(() => {
    onPopFromBasket?.(id);
  }, [id, onPopFromBasket]);

  const removeFromBasket = useCallback(() => {
    onRemoveFromBasket?.(id);
  }, [id, onRemoveFromBasket]);

  return (
    <S.ProductCard>
      <S.ProductImage source={{ uri: img }} />
      <S.ProductName>{name}</S.ProductName>
      <S.ProductPrice>Price: {price}</S.ProductPrice>
      {quantityInBasket && (
        <S.ProductQuantityInBasket>Quantity: {quantityInBasket}</S.ProductQuantityInBasket>
      )}
      {onAddBasket && <Button title="Add to Basket" onPress={addToBasket} />}
      {onPopFromBasket && <Button title="Pop from Basket" onPress={popFromBasket} />}
      {onRemoveFromBasket && <Button title="Remove from Basket" onPress={removeFromBasket} />}
    </S.ProductCard>
  );
};

export default ProductItem;
