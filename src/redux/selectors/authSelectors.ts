import {appStateType} from "../reduxStore";

export const selectIsAuth = (state: appStateType) => {
  return state.auth.isAuth;
}

export const selectLogin = (state: appStateType) => {
  return state.auth.login;
}