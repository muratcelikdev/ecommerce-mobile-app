import React, { useEffect, useState, useCallback } from 'react';
import { Button, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Product } from 'api/product/product.model';

import ProductItem from 'components/product-item';

import { useApi } from 'context/ApiContext';
import { useBasket } from 'context/BasketContext';

import * as S from 'pages/Products/styles';

import { Paths } from 'routes/paths';

const ProductsPage = () => {
  const navigation = useNavigation();
  const { product } = useApi();
  const { addToBasket } = useBasket();

  const [products, setProducts] = useState<Array<Product>>([]);

  const getProductsHandler = useCallback(async () => {
    try {
      const getProductsResponse = await product.getProducts();
      setProducts(getProductsResponse.data);
    } catch (error) {}
  }, [products]);

  const goToBasket = useCallback(() => {
    navigation.navigate(Paths.Basket as never);
  }, [navigation]);

  const addToBasketHandler = useCallback(
    (id: number) => {
      addToBasket(id);
    },
    [addToBasket]
  );

  useEffect(() => {
    getProductsHandler();
  }, [getProductsHandler]);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductItem {...item} onAddBasket={addToBasketHandler} />
  );

  return (
    <S.ProductList>
      <Button title="Go to Basket" onPress={goToBasket} />
      <FlatList<Product>
        data={products}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </S.ProductList>
  );
};

export default ProductsPage;
