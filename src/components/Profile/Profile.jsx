import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import './Profile.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className='content'>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} addPost={props.addPost} />
    </div>
  );
}

export default Profile;