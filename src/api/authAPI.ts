import {instance, responseType, resultCodeCaptcha, resultCodeEnum} from "./api";

type responseDataType = {
  id: number
  email: string
  login: string
}

type responseLoginDataType = {
  userId: number
}

export const authAPI = {
  getAuth() {
    return instance.get<responseType<responseDataType>>(`auth/me`).then(r => r.data);
  },
  postLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    let body = {email, password, rememberMe, captcha};
    return instance.post<responseType<responseLoginDataType, resultCodeEnum | resultCodeCaptcha>>(`auth/login`, body).then(r => r.data);
  },
  deleteLogin() {
    return instance.delete(`auth/login`);
  }
}