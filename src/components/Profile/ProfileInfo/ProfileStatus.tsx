import React, {ChangeEvent, useEffect, useState} from 'react';
import './ProfileInfo.css';

type propsTypes = {
  status: string
  putStatus: (newStatus: string) => void
}

const ProfileStatus: React.FC<propsTypes> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.putStatus(status);
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  }

  return (
      <div>
        {!editMode
            ? <div>
              <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || "Hello World"}</span>
            </div>
            : <div>
              <input type="text" autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
            </div>
        }
      </div>
  );
}

export default ProfileStatus;