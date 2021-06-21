import React from 'react';

import './MyPosts.css';
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add new post</button>
      </div>
      <div>
        <Post message='Good day, how are you?' likesCount='10' />
        <Post message='That is my first post' likesCount='2' />
      </div>
    </div>
  );
}

export default MyPosts;