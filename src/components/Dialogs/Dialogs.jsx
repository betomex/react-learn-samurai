import React from 'react';
import './Dialogs.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>);

  let messagesElements = props.dialogsPage.messages
    .map(message => <Message message={message.message} key={message.id}/>)

  let messageText = props.dialogsPage.newMessageText;

  let onSendMessageClick = () => {
    props.sendMessage();
  }

  let onNewMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
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