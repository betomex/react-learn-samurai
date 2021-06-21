import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import './Profile.css';

const Profile = () => {
  return (
    <div className='content'>
      <div>
        <img src='https://lirp-cdn.multiscreensite.com/9a66ad73/dms3rep/multi/opt/Muirwoods-optimized-1920w.jpg' />
      </div>
      <div>
        avatar + description
        </div>
      <MyPosts />
    </div>
  );
}

export default Profile;