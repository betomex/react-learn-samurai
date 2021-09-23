import React from 'react';
import '../Dialogs.css';

type propsType = {
  message: string
}

const Message: React.FC<propsType> = (props) => {
  return (
    <div className="message">{props.message}</div>
  );
}

export default Message;