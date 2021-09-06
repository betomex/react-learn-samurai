import React from 'react';
import './ProfileInfo.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({userProfile, status, putStatus}) => {
  if (!userProfile) {
    return <Preloader/>
  }

  return (
    <div>
      <div className="descBlock">
        <img src={userProfile.photos.large} alt="profileAvatar"/>
        <ProfileStatusWithHooks status={status} putStatus={putStatus}/>
      </div>
    </div>
  );
}

export default ProfileInfo;