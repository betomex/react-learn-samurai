import {resultCodeCaptcha, resultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {baseThunkType, inferActionsTypes} from "./reduxStore";

export type initialStateType = typeof initialState;
type actionsType = inferActionsTypes<typeof actions>
type thunkType = baseThunkType<actionsType | ReturnType<typeof stopSubmit>>

let initialState = {
  userID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captcha: null as string | null
};

const authReducer = (state = initialState, action: actionsType): initialStateType => {
  switch (action.type) {
    case "AUTH/SET-USER-DATA": {
      return {
        ...state,
        ...action.data
      }
    }
    case "AUTH/GET-CAPTCHA": {
      return {
        ...state,
        captcha: action.url
      }
    }
    default:
      return state;
  }
}

export const actions = {
  setAuthUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'AUTH/SET-USER-DATA',
    data: {userID, email, login, isAuth}
  } as const),
  getCaptchaUrl: (url: string) => ({type: 'AUTH/GET-CAPTCHA', url} as const)
}

export const getAuth = (): thunkType => async (dispatch) => {
  let data = await authAPI.getAuth();

  if (data.resultCode === resultCodeEnum.Success) {
    let {id, email, login} = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
}

export const postLogin =
    (email: string, password: string, rememberMe: boolean, captcha: string): thunkType => async (dispatch) => {
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

export const deleteLogin = (): thunkType => async (dispatch) => {
  let response = await authAPI.deleteLogin();

  if (response.data.resultCode === resultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
}

export const getCaptcha = (): thunkType => async (dispatch) => {
  const data = await securityAPI.getCaptcha();
  dispatch(actions.getCaptchaUrl(data.url));
}

export default authReducer;