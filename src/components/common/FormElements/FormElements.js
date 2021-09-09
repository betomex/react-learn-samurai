import React from "react";
import './FormElements.css';
import {Field} from "redux-form";

const FormElement = ({meta: {error, touched}, children}) => {
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

export const Textarea = (props) => {
  const {input, meta, child, ...restProps} = props;
  return <FormElement {...props}>
    <textarea {...input} {...restProps}/>
  </FormElement>
}

export const Input = (props) => {
  const {input, meta, child, ...restProps} = props;
  return <FormElement {...props}>
    <input {...input} {...restProps}/>
  </FormElement>
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
  return <div>
    <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> {text}
  </div>
}