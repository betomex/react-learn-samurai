import React from 'react';

import './MyPosts.css';
import Post from './Post/Post';

const MyPosts = () => {
  let postsData = [
    {id: 1, message: "Good day, how are you?", likesCount: 10},
    {id: 2, message: "That is my first post", likesCount: 2},
  ];

  let postsElements = postsData
    .map(post => <Post message={post.message} likesCount={post.likesCount} />)

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
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts;