import React from 'react';
import './Profile.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div className='content'>
      <ProfileInfo userProfile={props.userProfile} status={props.status} putStatus={props.putStatus}
                   isOwner={props.isOwner} putPhoto={props.putPhoto} putProfile={props.putProfile}/>
      <MyPostsContainer/>
    </div>
  );
}

export default Profile;