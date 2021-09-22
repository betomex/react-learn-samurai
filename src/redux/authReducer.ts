import {resultCodeCaptcha, resultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";

const SET_USER_DATA = 'learnRedux/auth/SET-USER-DATA';
const GET_CAPTCHA = 'GET-CAPTCHA';

let initialState = {
  userID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captcha: null as string | null
};
export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
      }
    }
    case GET_CAPTCHA: {
      return {
        ...state,
        captcha: action.url
      }
    }
    default:
      return state;
  }
}

type setAuthUserDataActionType = {
  userID: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}
type setAuthUserDataType = {
  type: typeof SET_USER_DATA,
  data: setAuthUserDataActionType
}
export const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({
  type: SET_USER_DATA,
  data: {userID, email, login, isAuth}
})

type getCaptchaUrlType = {
  type: typeof GET_CAPTCHA,
  url: string
}
export const getCaptchaUrl = (url: string): getCaptchaUrlType => ({type: GET_CAPTCHA, url})

export const getAuth = () => async (dispatch: any) => {
  let data = await authAPI.getAuth();

  if (data.resultCode === resultCodeEnum.Success) {
    let {id, email, login} = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const postLogin = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  let data = await authAPI.postLogin(email, password, rememberMe, captcha);

  if (data.resultCode === resultCodeEnum.Success) {
    dispatch(getAuth());
  } else {
    if (data.resultCode === resultCodeCaptcha.CaptchaIsRequired) {
      dispatch(getCaptcha());
    }
    let errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", {_error: errorMessage}));
  }
}

export const deleteLogin = () => async (dispatch: any) => {
  let response = await authAPI.deleteLogin();

  if (response.data.resultCode === resultCodeEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export const getCaptcha = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptcha();
  dispatch(getCaptchaUrl(data.url));
}

export default authReducer;