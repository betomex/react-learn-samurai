import React from 'react';
import './MyPosts.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {createField, Textarea} from "../../common/FormElements/FormElements";

type addPostFormType = {
  postMessage: string
}
type addPostFormTypeKeys = keyof addPostFormType

const maxLength50 = maxLengthCreator(50);

const AddPostForm: React.FC<InjectedFormProps<addPostFormType>> = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      {createField<addPostFormTypeKeys>("message text...", "postMessage", [required, maxLength50], Textarea)}
    </div>
    <div>
      <button>Add new post</button>
    </div>
  </form>
}

export const AddPostReduxForm = reduxForm<addPostFormType>({
  form: "profileAddPostForm"
})(AddPostForm);