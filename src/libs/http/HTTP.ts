/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { TypeResponse } from "types/api";
import axios from "./axios";

class HTTP {
  config: AxiosRequestConfig = {
    baseURL: axios.defaults.baseURL,
  };

  private getConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    return { ...this.config, ...(config || {}) };
  }

  protected async get(url: string, config?: AxiosRequestConfig) {
    const res: TypeResponse<any> = await axios.get(url, this.getConfig(config));
    return res;
  }

  protected async post(url: string, data?: any, config?: AxiosRequestConfig) {
    const res: TypeResponse<any> = await axios.post(url, data, this.getConfig(config));
    return res;
  }

  protected async delete(url: string, data?: any, config?: AxiosRequestConfig) {
    const res: TypeResponse<any> = await axios.delete(url, this.getConfig({ ...config, data }));
    return res;
  }

  protected async put(url: string, data?: any, config?: AxiosRequestConfig) {
    const res: TypeResponse<any> = await axios.put(url, data, this.getConfig(config));
    return res;
  }

  protected async patch(url: string, data?: any, config?: AxiosRequestConfig) {
    const res = await axios.patch(url, data, config);
    return res;
  }

  protected async request(config: AxiosRequestConfig) {
    const res = await axios.request(config);
    return res;
  }

  protected async head(url: string, config?: AxiosRequestConfig) {
    const res = await axios.head(url, config);
    return res;
  }

  protected async options(url: string, config?: AxiosRequestConfig) {
    const res = await axios.options(url, config);
    return res;
  }
}
export default HTTP;
