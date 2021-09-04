import React, {useState} from 'react';
import './ProfileInfo.css';

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.putStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div>
      {!editMode
        ? <div>
          <span onDoubleClick={activateEditMode}>{props.status || "Hello World"}</span>
        </div>
        : <div>
          <input type="text" autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
        </div>
      }
    </div>
  );
}

export default ProfileStatusWithHooks;