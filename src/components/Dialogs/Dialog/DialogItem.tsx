import React from 'react';
import '../Dialogs.css';
import {NavLink} from "react-router-dom";

type propsType = {
  id: number
  name: string
}

const DialogItem: React.FC<propsType> = (props) => {
  return (
    <div className="dialog active">
      <NavLink to={"/dialogs/1" + props.id}>{props.name}</NavLink>
    </div>
  );
}

export default DialogItem;