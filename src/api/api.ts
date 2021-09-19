import axios from "axios";
import {profileType} from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "cf7b570a-c9c8-43b8-85da-682ef4236245"
  }
});

export enum resultCodeEnum {
  Success = 0,
  Error = 1
}

export enum resultCodeCaptcha {
  CaptchaIsRequired = 10
}

type getAuthType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: resultCodeEnum
  messages: Array<string>
}

type postLoginType = {
  data: {
    userId: number
  }
  resultCode: resultCodeEnum | resultCodeCaptcha
  messages: Array<string>
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
  }
}

export const authAPI = {
  getAuth() {
    return instance.get<getAuthType>(`auth/me`).then(r => r.data);
  },
  postLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    let body = {email, password, rememberMe, captcha};
    return instance.post<postLoginType>(`auth/login`, body).then(r => r.data);
  },
  deleteLogin() {
    return instance.delete(`auth/login`);
  }
}

export const profileAPI = {
  getProfileUserID(userID: number) {
    return instance.get(`profile/${userID}`);
  },
  getStatusUserID(userID: number) {
    return instance.get(`profile/status/${userID}`);
  },
  putStatus(status: string) {
    let body = {status: status};
    return instance.put(`profile/status`, body);
  },
  putPhoto(photoFile: any) {
    let formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData);
  },
  putProfile(profile: profileType) {
    return instance.put(`profile`, profile);
  }
}

export const followAPI = {
  deleteFollow(userID: number) {
    return instance.delete(`follow/${userID}`).then(r => r.data);
  },
  postFollow(userID: number) {
    return instance.post(`follow/${userID}`).then(r => r.data);
  }
}

export const securityAPI = {
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  }
}