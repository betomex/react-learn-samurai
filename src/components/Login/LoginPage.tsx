import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import '../common/FormElements/FormElements.css';
import {appStateType} from "../../redux/reduxStore";
import {LoginReduxForm} from "./LoginForm";

export const LoginPage: React.FC = () => {
  const captcha = useSelector((state: appStateType) => state.auth.captcha)
  const isAuth = useSelector((state: appStateType) => state.auth.isAuth)

  const dispatch = useDispatch()

  const onSubmit = (formData: any) => {
    dispatch(postLogin(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
  </div>
}