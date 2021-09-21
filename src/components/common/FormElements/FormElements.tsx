import React from "react";
import './FormElements.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {validatorType} from "../../../utils/validators";

type formElementPropsType = {
  meta: WrappedFieldMetaProps
}

const FormElement: React.FC<formElementPropsType> = ({meta: {error, touched}, children}) => {
  const errorCondition = error && touched;

  return <div className={errorCondition ? "formControl error" : "formControl"}>
    <div>
      {children}
    </div>
    <div>
      {errorCondition ? <span>{error}</span> : <></>}
    </div>
  </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormElement {...props}>
    <textarea {...input} {...restProps}/>
  </FormElement>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormElement {...props}>
    <input {...input} {...restProps}/>
  </FormElement>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType, validators: Array<validatorType>,
                            component: React.FC<WrappedFieldProps>, props = {}, text = "") {
  return <div>
    <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> {text}
  </div>
}