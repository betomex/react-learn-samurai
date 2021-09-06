import React from "react";
import './FormElements.css';

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