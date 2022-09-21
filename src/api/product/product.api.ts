import { useRef } from 'react';
import { Axios, AxiosPromise } from 'axios';

import { productApiEndpoints } from 'api/product/product.endpoint';
import {
  GetProductsResponse,
  GetProductDetailRequest,
  GetProductDetailResponse,
  ProductApiCalls,
} from 'api/product/product.model';

import { HttpService } from 'common/http/http.service';

const useProductApi = (httpService: InstanceType<typeof HttpService>): ProductApiCalls => {
  const generateApiCalls = (): ProductApiCalls => {
    return {
      getProducts: (): AxiosPromise<GetProductsResponse> =>
        httpService.client.get(productApiEndpoints.getProducts),
      getProductDetail: (
        payload: GetProductDetailRequest
      ): AxiosPromise<GetProductDetailResponse> => {
        const getProductDetailEndpoint = productApiEndpoints.getProductDetail.replace(
          ':id',
          payload.id.toString()
        );

        return httpService.client.get(getProductDetailEndpoint);
      },
    };
  };

  const productApiCallsRef = useRef<ProductApiCalls>(generateApiCalls());

  return productApiCallsRef.current;
};

export default useProductApi;
