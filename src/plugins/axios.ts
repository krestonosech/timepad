import axios, { AxiosRequestConfig, AxiosStatic } from 'axios'

interface CustomAxiosInstance extends AxiosStatic {
  create(options?: AxiosRequestConfig): CustomAxiosInstance;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
}

export default axios as CustomAxiosInstance
export { axios }
