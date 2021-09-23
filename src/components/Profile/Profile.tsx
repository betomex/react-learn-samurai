import React from 'react';
import './Profile.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../types/types";

type propsType = {
  userProfile: profileType | null
  status: string
  putStatus: (status: string) => void
  isOwner: boolean
  putPhoto: (file: File) => void
  putProfile: (profile: profileType) => Promise<any>
}

const Profile: React.FC<propsType> = (props) => {
  return (
    <div className='content'>
      <ProfileInfo userProfile={props.userProfile} status={props.status} putStatus={props.putStatus}
                   isOwner={props.isOwner} putPhoto={props.putPhoto} putProfile={props.putProfile}/>
      <MyPostsContainer/>
    </div>
  );
}

export default Profile;