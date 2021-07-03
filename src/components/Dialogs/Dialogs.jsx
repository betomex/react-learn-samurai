import React from 'react';
import './Dialogs.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogs
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

  let messagesElements = props.messages
    .map(message => <Message message={message.message} />)

  return (
    <div className="dialogs">
      <div className="dialogs-items">
        {dialogsElements}
      </div>
      <div className="messages">
        {messagesElements}
      </div>
    </div>
  );
}

export default Dialogs;