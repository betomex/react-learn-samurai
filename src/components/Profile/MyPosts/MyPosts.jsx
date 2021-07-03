import React from 'react';

import './MyPosts.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let postsElements = props.posts
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