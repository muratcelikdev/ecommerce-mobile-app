import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BasketPage from 'pages/Basket';
import ProductsPage from 'pages/Products';

import { Paths } from 'routes/paths';

export type RootStateParams = {
  [Paths.Basket]: undefined;
  [Paths.Products]: undefined;
};

const Stack = createNativeStackNavigator<RootStateParams>();

const Routers = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Paths.Products}>
        <Stack.Screen name={Paths.Basket} component={BasketPage} />
        <Stack.Screen name={Paths.Products} component={ProductsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
