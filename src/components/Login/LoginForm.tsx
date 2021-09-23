import React from "react";

import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormElements/FormElements";
import {required} from "../../utils/validators";
import '../common/FormElements/FormElements.css';

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

export const LoginReduxForm = reduxForm<loginFormType, ownPropsType>({
  form: 'login'
})(LoginForm);