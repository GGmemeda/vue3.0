import request from "@/utils/request";
import {LoginProps} from "@/api/login/define/login";


// 登录接口
export function loginByUsername(data:LoginProps):Promise<any> {
  return request({
    url: '/unityLogin',
    // url: '/login',
    method: 'post',
    data: data
  });
}