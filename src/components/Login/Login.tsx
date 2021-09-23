import React from "react";
import {connect} from "react-redux";
import {postLogin} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import '../common/FormElements/FormElements.css';
import {appStateType} from "../../redux/reduxStore";
import { LoginReduxForm } from "./LoginForm";

type mapStateToPropsType = {
  captcha: string | null
  isAuth: boolean
}
type mapDispatchToPropsType = {
  postLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.postLogin(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
  </div>
}

const mapStateToProps = (state: appStateType): mapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
  }
}

const mapDispatchToProps = {
  postLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);