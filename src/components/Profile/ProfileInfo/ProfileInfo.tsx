import React, {ChangeEvent, useState} from 'react';
import './ProfileInfo.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from '../../../assets/images/98-988072_go-to-image-add-user-icon-clipart.png';
import {contactsType, profileType} from "../../../types/types";
import { ProfileDataReduxForm } from './ProfileDataForm';

type profileInfoPropsType = {
  userProfile: profileType | null
  status: string
  putStatus: (status: string) => void
  isOwner: boolean
  putPhoto: (file: File) => void
  putProfile: (profile: profileType) => Promise<any>
}
type profileDataPropsType = {
  userProfile: profileType
  isOwner: boolean
  toggleEditMode: () => void
}
type contactPropsType = {
  contactTitle: string
  contactValue: string
}

const ProfileInfo: React.FC<profileInfoPropsType> = ({userProfile, status, putStatus, isOwner, putPhoto, putProfile}) => {
  let [editMode, setEditMode] = useState(false);

  if (!userProfile) {
    return <Preloader/>
  }

  const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      putPhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData: profileType) => {
    putProfile(formData).then(() => {
      setEditMode(false);
    });
  }

  return <div>
    <div className="descBlock">
      <img src={userProfile.photos.large || userPhoto} alt="profileAvatar"/>
      <br/>
      {isOwner && <input type="file" onChange={onAvatarSelected}/>}

      {editMode ?
          <ProfileDataReduxForm userProfile={userProfile} initialValues={userProfile} onSubmit={onSubmit}/> :
          <ProfileData userProfile={userProfile} isOwner={isOwner} toggleEditMode={() => {
            setEditMode(true);
          }}/>}

      <ProfileStatus status={status} putStatus={putStatus}/>
    </div>
  </div>
}

const ProfileData: React.FC<profileDataPropsType> = ({userProfile, isOwner, toggleEditMode}) => {
  return <div>
    {isOwner && <div>
      <button onClick={toggleEditMode}>edit</button>
    </div>}
    <div>
      <b>Full name:</b> {userProfile.fullName}
    </div>
    <div>
      <b>Looking for a job:</b> {userProfile.lookingForAJob ? "Yes" : "No"}
    </div>
    {userProfile.lookingForAJob &&
    <div>
      {userProfile.lookingForAJobDescription}
    </div>
    }
    <b>Contacts: </b> {Object.keys(userProfile.contacts)
      .map(key => <Contact key={key} contactTitle={key}
                           contactValue={userProfile.contacts[key as keyof contactsType]}/>)}
  </div>
}

const Contact: React.FC<contactPropsType> = ({contactTitle, contactValue}) => {
  return <div className="contact">
    <b>{contactTitle}: </b>
    {contactValue ? contactValue : "_____"}
  </div>
}

export default ProfileInfo;