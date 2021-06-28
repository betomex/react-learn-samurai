import React from 'react';

import './MyPosts.css';
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div className="postsBlock">
      <h3>My posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add new post</button>
        </div>
      </div>
      <div className="posts">
        <Post message='Good day, how are you?' likesCount='10'/>
        <Post message='That is my first post' likesCount='2'/>
      </div>
    </div>
  );
}

export default MyPosts;