import React from 'react';
import './Dialogs.css';

const Dialogs = (props) => {
  return (
    <div className="dialogs">
      <div className="dialogs-items">
        <div className="dialog active">
          Ilya
        </div>
        <div className="dialog">
          Makson
        </div>
        <div className="dialog">
          Oks
        </div>
        <div className="dialog">
          Ekaterina
        </div>
        <div className="dialog">
          Andrey
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