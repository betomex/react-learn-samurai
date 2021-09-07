import React from 'react';
import './ProfileInfo.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({userProfile, status, putStatus}) => {
  if (!userProfile) {
    return <Preloader/>
  }

  return (
    <div>
      <div className="descBlock">
        <img src={userProfile.photos.large} alt="profileAvatar"/>
        <ProfileStatus status={status} putStatus={putStatus}/>
      </div>
    </div>
  );
}

export default ProfileInfo;