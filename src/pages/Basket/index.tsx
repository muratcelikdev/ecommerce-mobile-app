import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { AxiosResponse } from 'axios';

import { Product } from 'api/product/product.model';

import ProductItem from 'components/product-item';

import { useApi } from 'context/ApiContext';
import { BasketItem, useBasket } from 'context/BasketContext';

import * as S from 'pages/Basket/styles';

const BasketPage = () => {
  const { items, addToBasket, popFromBasket, removeFromBasket } = useBasket();
  const { product } = useApi();

  const [products, setProducts] = useState<Array<Product>>([]);

  const idList = useMemo(() => items.map((item: BasketItem) => item.id), [items]);

  const getAllProductsFromBasket = useCallback(async () => {
    try {
      const responses = await Promise.all(
        idList.map((id: number) => product.getProductDetail({ id }))
      );

      setProducts(responses.map((response: AxiosResponse) => response.data));
    } catch (error) {}
  }, [idList, product]);

  useEffect(() => {
    getAllProductsFromBasket();
  }, [getAllProductsFromBasket]);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductItem
      {...item}
      onAddBasket={addToBasket}
      onPopFromBasket={popFromBasket}
      onRemoveFromBasket={removeFromBasket}
      quantityInBasket={items[idList.indexOf(item.id)]?.quantity}
    />
  );

  return (
    <S.BasketItemsList>
      <FlatList<Product>
        data={products}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </S.BasketItemsList>
  );
};

export default BasketPage;
