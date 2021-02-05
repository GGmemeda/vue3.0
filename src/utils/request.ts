import axios from 'axios';
// import store from '@/store';
import {getToken, removeToken} from '@/utils/auth';
import router from "@/router";
// import router from '../router';
// console.log(process.env.VUE_APP_BASE_API);
// create an axios instance
const baseURL:string= (import.meta.env.VITE_APP_BASE_API || '') as string;
const requestAxios = axios.create({
  baseURL, // api 的 base_url
  timeout: 5000, // request timeout
  // @ts-ignore
  retry: 2,
  retryDelay: 300,
});
/***
 * 当前项目中,请求code
 */
// request interceptor
requestAxios.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = getToken();
    }
    // config.headers['Authorization'] = 'FtP45RxJY+rEpqlYmAmXVTKZVXE=';
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

requestAxios.interceptors.response.use(
  response => {


    // token失效
    if (response.data.code === '102000') {
      setTimeout(() => {
        removeToken();
        router.push('/');
      }, 300);
      return  Promise.reject(response);
    }
    // @ts-ignore
    if (response.config.download) {
      return response;
    }
    if(response.data.code === '000000'){
      return response.data
    }else{
      return  Promise.reject(response);
    }
  },

  err => {
    console.log('err' + err); // for debug
    // 请求超时， 重新请求
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('');
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config);
    });
    // return Promise.reject(error);
  }
);

export default requestAxios;
