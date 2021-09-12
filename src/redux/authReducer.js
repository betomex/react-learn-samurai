import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'learnRedux/auth/SET-USER-DATA';
const GET_CAPTCHA = 'GET-CAPTCHA';

let initialState = {
  userID: null,
  email: null,
  login: null,
  isAuth: false,
  captcha: null
};

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userID, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: {userID, email, login, isAuth}
})
export const getCaptchaUrl = (url) => ({type: GET_CAPTCHA, url})

export const getAuth = () => async (dispatch) => {
  let response = await authAPI.getAuth();

  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const postLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.postLogin(email, password, rememberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptcha());
    }
    let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    dispatch(stopSubmit("login", {_error: errorMessage}));
  }
}

export const deleteLogin = () => async (dispatch) => {
  let response = await authAPI.deleteLogin();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export const getCaptcha = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha();
  dispatch(getCaptchaUrl(response.data.url));
}

export default authReducer;