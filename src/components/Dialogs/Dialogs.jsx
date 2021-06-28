import React from 'react';
import './Dialogs.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
  return (
    <div className="dialog active">
      <NavLink to={"/dialogs/1" + props.id}>{props.name}</NavLink>
    </div>
  );
}

const Message = (props) => {
  return (
    <div className="message">{props.message}</div>
  );
}

const Dialogs = (props) => {
  let dialogsData = [
    {id: 1, name: "Ilya"},
    {id: 2, name: "Makson"},
    {id: 3, name: "Oks"},
    {id: 4, name: "Ekaterina"},
    {id: 5, name: "Andrey"},
  ];

  let dialogsElements = dialogsData
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);

  let messagesData = [
    {id: 1, message: "What a nice day today"},
    {id: 2, message: "It's the best way to relax"},
    {id: 3, message: "What do you think about going for a walk?"},
  ];

  let messagesElements = messagesData
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