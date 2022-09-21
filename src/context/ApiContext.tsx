import { useContext, useRef, createContext } from 'react';

import useProductApi from 'api/product/product.api';
import { ProductApiCalls } from 'api/product/product.model';

import httpService, { HttpService } from 'common/http/http.service';

interface ApiContextProps {
  children: React.ReactNode;
}

export interface ApiContextModel {
  product: ProductApiCalls;
}

const ApiContext = createContext({} as ApiContextModel);

const ApiContextProvider = ({ children }: ApiContextProps) => {
  const httpInstance = useRef<HttpService>(httpService);

  const product = useProductApi(httpInstance.current);

  return <ApiContext.Provider value={{ product }}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);

export default ApiContextProvider;
