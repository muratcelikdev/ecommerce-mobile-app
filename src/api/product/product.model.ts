import { Axios, AxiosResponse } from 'axios';

export interface Product {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

export interface GetProductsResponse extends Array<Product> {}

export interface GetProductDetailRequest {
  id: number;
}

export interface GetProductDetailResponse extends Product {}

export interface ProductApiCalls {
  getProducts: () => AxiosResponse<GetProductsResponse>;
  getProductDetail: (payload: GetProductDetailRequest) => AxiosResponse<GetProductDetailResponse>;
}
