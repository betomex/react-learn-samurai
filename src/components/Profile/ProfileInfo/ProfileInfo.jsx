import React from 'react';
import './ProfileInfo.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
  if (!props.userProfile) {
    return <Preloader/>
  }

  return (
    <div>
      <div>
        <img src='https://lirp-cdn.multiscreensite.com/9a66ad73/dms3rep/multi/opt/Muirwoods-optimized-1920w.jpg'
             alt="pic"/>
      </div>
      <div className="descBlock">
        <img src={props.userProfile.photos.large} alt="profileAvatar"/>
        avatar + description
      </div>
    </div>
  );
}

export default ProfileInfo;