import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import './Profile.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
  return (
    <div className='content'>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
}

export default Profile;