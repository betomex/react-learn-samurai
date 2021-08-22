import React from 'react';
import './Dialogs.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormElements/FormElements";
import {maxLengthCreator, required} from "../../utils/validators";

const maxLength50 = maxLengthCreator(50);

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>);

  let messagesElements = props.dialogsPage.messages
    .map(message => <Message message={message.message} key={message.id}/>)

  let addNewMessage = (values) => {
    props.sendMessage(values.messageText);
  }

  if (!props.isAuth) {
    return <Redirect to={"/login"}/>
  }

  return (
    <div className="dialogs">
      <div className="dialogs-items">
        {dialogsElements}
      </div>
      <div className="messages">
        <div>
          {messagesElements}
        </div>
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </div>
    </div>
  );
}

const AddMessageForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field placeholder='Enter your message here...' component={Textarea} name={"messageText"}
             validate={[required, maxLength50]}/>
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
}

const AddMessageReduxForm = reduxForm({
  form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs;