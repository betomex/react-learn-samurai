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