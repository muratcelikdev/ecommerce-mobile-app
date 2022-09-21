import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
};

export class HttpService {
  private _client: AxiosInstance;

  constructor() {
    this._client = axios.create(axiosConfig);
  }

  public get client(): AxiosInstance {
    return this._client;
  }
}

export default new HttpService();
