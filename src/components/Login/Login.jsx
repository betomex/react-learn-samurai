import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormElements/FormElements";
import {maxLengthCreator, required} from "../../utils/validators";

const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field type={"text"} placeholder={"Login"} name={"login"} component={Input} validate={[required]}/>
    </div>
    <div>
      <Field type={"text"} placeholder={"Password"} name={"password"} component={Input} validate={[required]}/>
    </div>
    <div>
      <Field type="checkbox" component={"input"} name={"rememberMe"}/> Remember Me
    </div>
    <div>
      <button>Login</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  }

  return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}

export default Login;