import React from 'react';
import './Dialogs.css';
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
  return (
    <div className="dialogs">
      <div className="dialogs-items">
        <div className="dialog active">
          <NavLink to="/dialogs/1">Ilya</NavLink>
        </div>
        <div className="dialog">
          <NavLink to="/dialogs/2">Makson</NavLink>
        </div>
        <div className="dialog">
          <NavLink to="/dialogs/3">Oks</NavLink>
        </div>
        <div className="dialog">
          <NavLink to="/dialogs/4">Ekaterina</NavLink>
        </div>
        <div className="dialog">
          <NavLink to="/dialogs/5">Andrey</NavLink>
        </div>
      </div>
      <div className="messages">
        <div className="message">What a nice day today</div>
        <div className="message">What do you think about going for a walk?</div>
        <div className="message">It's the best way to relax</div>
      </div>
    </div>
  );
}

export default Dialogs;