import React from 'react';
import './ProfileInfo.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.userProfile) {
    return <Preloader/>
  }

  return (
    <div>
      {/*<div className="profilePhoto">*/}
      {/*  <img src='https://lirp-cdn.multiscreensite.com/9a66ad73/dms3rep/multi/opt/Muirwoods-optimized-1920w.jpg'*/}
      {/*       alt="pic"/>*/}
      {/*</div>*/}
      <div className="descBlock">
        <img src={props.userProfile.photos.large} alt="profileAvatar"/>
        <ProfileStatusWithHooks status={props.status} putStatus={props.putStatus}/>
      </div>
    </div>
  );
}

export default ProfileInfo;