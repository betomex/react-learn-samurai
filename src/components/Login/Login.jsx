import React from "react";

import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormElements/FormElements";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {postLogin} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import '../common/FormElements/FormElements.css';

const LoginForm = ({handleSubmit, error, captcha}) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <Field type={"text"} placeholder={"Email"} name={"email"} component={Input} validate={[required]}/>
    </div>
    <div>
      <Field type={"password"} placeholder={"Password"} name={"password"} component={Input} validate={[required]}/>
    </div>
    <div>
      <Field type="checkbox" component={"input"} name={"rememberMe"}/> Remember Me
    </div>

    {captcha && <img src={captcha} alt="captcha img"/>}
    {captcha && createField("captcha input", "captcha", [required], Input, {})}

    {error && <div className="form-summary-error">{error}</div>}
    <div>
      <button>Login</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
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

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
  }
}

const mapDispatchToProps = {
  postLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);