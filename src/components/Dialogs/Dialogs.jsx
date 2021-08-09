import React from 'react';
import './Dialogs.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/state";

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogs
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

  let messagesElements = props.state.messages
    .map(message => <Message message={message.message}/>)

  let messageText = props.state.newMessageText;

  let onSendMessageClick = () => {
    props.dispatch(sendMessageActionCreator());
  }

  let onNewMessageChange = (e) => {
    let text = e.target.value;
    props.dispatch(updateNewMessageTextActionCreator(text));
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
        <div>
          <div>
            <textarea value={messageText} placeholder='Enter your message here...' onChange={onNewMessageChange}/>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;