import React from 'react';
import './Dialogs.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormElements/FormElements";
import {maxLengthCreator, required} from "../../utils/validators";
import {addMessageFormType} from './Dialogs';

const maxLength50 = maxLengthCreator(50);

type addMessageFormTypeKeys = keyof addMessageFormType

const AddMessageForm: React.FC<InjectedFormProps<addMessageFormType>> = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      {createField<addMessageFormTypeKeys>(
          "Enter your message here...", "messageText", [required, maxLength50], Textarea
      )}
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
}

export const AddMessageReduxForm = reduxForm<addMessageFormType>({
  form: "dialogAddMessageForm"
})(AddMessageForm);