import React from "react";

import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormElements/FormElements";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {postLogin} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import '../common/FormElements/FormElements.css';
import {appStateType} from "../../redux/reduxStore";

type mapStateToPropsType = {
  captcha: string | null
  isAuth: boolean
}
type mapDispatchToPropsType = {
  postLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type ownPropsType = {
  captcha: string | null
}
type loginFormType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type loginFormTypeKeys = keyof loginFormType

const LoginForm: React.FC<InjectedFormProps<loginFormType, ownPropsType> & ownPropsType> = ({handleSubmit, error, captcha}) => {
  return <form onSubmit={handleSubmit}>
    {createField<loginFormTypeKeys>("Email", "email", [required], Input, {type: "text"})}
    {createField<loginFormTypeKeys>("Password", "password", [required], Input, {type: "password"})}
    {createField<loginFormTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "Remember Me")}

    {captcha && <img src={captcha} alt="captcha img"/>}
    {captcha && createField<loginFormTypeKeys>("captcha input", "captcha", [required], Input, {})}

    {error && <div className="form-summary-error">{error}</div>}
    <div>
      <button>Login</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm<loginFormType, ownPropsType>({
  form: 'login'
})(LoginForm);

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