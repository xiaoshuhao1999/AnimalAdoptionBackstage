import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

class HttpRequest {
  private readonly baseUrl: string;
  constructor() {
    // 设置baseUrl
    this.baseUrl = 'http://localhost:3000/api/v1'
  }
  getInstanceConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      // 设置超时
      timeout: 15000
    }
    // 返回配置参数
    return config
  }
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading..
      // 请求头携带token
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
    //响应拦截
    instance.interceptors.response.use(res => {
      //返回数据
      return res
    }, (error: any) => {
      console.log('error==>', error)
      return Promise.reject(error)
    })
  }
  request(options: AxiosRequestConfig) {
    // 创建axios实例
    const instance = axios.create()
    options = Object.assign(this.getInstanceConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const http = new HttpRequest();
export default http;