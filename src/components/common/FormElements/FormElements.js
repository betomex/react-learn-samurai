import React from "react";
import './FormElements.css';

const FormElement = ({input, meta, child, ...props}) => {
  const errorCondition = meta.error && meta.touched;

  return <div className={errorCondition ? "formControl error" : "formControl"}>
    <div>
      {props.children}
    </div>
    <div>
      {errorCondition ? <span>{meta.error}</span> : <></>}
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