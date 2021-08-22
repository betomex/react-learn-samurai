import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
  userID: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
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

export const getAuth = () => (dispatch) => {
  authAPI.getAuth().then(data => {
    if (data.resultCode === 0) {
      let {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
}

export const postLogin = (email, password, rememberMe) => (dispatch) => {
  authAPI.postLogin(email, password, rememberMe).then(data => {
    if (data.resultCode === 0) {
      dispatch(getAuth());
    } else {
      let errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", {_error: errorMessage}));
    }
  });
}

export const deleteLogin = () => (dispatch) => {
  authAPI.deleteLogin().then(data => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
}

export default authReducer;