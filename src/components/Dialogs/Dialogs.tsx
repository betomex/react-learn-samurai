import React from 'react';
import './Dialogs.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {initialStateType} from "../../redux/dialogsReducer";
import {AddMessageReduxForm} from './DialogsForm';

type propsType = {
  dialogsPage: initialStateType
  isAuth: boolean
  sendMessage: (messageText: string) => void
}
export type addMessageFormType = {
  messageText: string
}

const Dialogs: React.FC<propsType> = (props) => {
  let dialogsElements = props.dialogsPage.dialogs
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>);

  let messagesElements = props.dialogsPage.messages
    .map(message => <Message message={message.message} key={message.id}/>)

  let addNewMessage = (values: addMessageFormType) => {
    props.sendMessage(values.messageText);
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

export default Dialogs;