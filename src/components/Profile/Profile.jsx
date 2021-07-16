import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import './Profile.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className='content'>
      <ProfileInfo/>
      <MyPosts
        posts={props.profilePage.posts}
        dispatch={props.dispatch}
        newPostText={props.profilePage.newPostText}
      />
    </div>
  );
}

export default Profile;