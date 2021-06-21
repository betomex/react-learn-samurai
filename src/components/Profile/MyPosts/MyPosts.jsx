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
        <Post message='Good day, how are you?' />
        <Post message='That is my first post' />
      </div>
    </div>
  );
}

export default MyPosts;