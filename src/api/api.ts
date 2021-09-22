import axios from "axios";
import {usersType} from "../types/types";

export const instance = axios.create({
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

export type getItemsType = {
  items: Array<usersType>
  totalCount: number
  error: string | null
}

export type responseType<D = {}, RC = resultCodeEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}