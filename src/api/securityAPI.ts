import {instance} from "./api";

type responseCaptchaType = {
  url: string
}

export const securityAPI = {
  getCaptcha() {
    return instance.get<responseCaptchaType>(`security/get-captcha-url`).then(r => r.data);
  }
}