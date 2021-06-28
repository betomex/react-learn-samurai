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

  let messagesData = [
    {id: 1, message: "What a nice day today"},
    {id: 2, message: "It's the best way to relax"},
    {id: 3, message: "What do you think about going for a walk?"},
  ];

  return (
    <div className="dialogs">
      <div className="dialogs-items">
        <DialogItem name="Ilya" id="1" />
        <DialogItem name="Makson" id="2" />
        <DialogItem name="Oks" id="3" />
        <DialogItem name="Ekaterina" id="4" />
        <DialogItem name="Andrey" id="5" />
      </div>
      <div className="messages">
        <Message message="What a nice day today" />
        <Message message="It's the best way to relax" />
        <Message message="What do you think about going for a walk?" />
      </div>
    </div>
  );
}

export default Dialogs;