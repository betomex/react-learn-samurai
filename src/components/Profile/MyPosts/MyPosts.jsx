import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";

const MyPosts = (props) => {
  let postsElements = props.posts
    .map(post => <Post message={post.message} likesCount={post.likesCount}/>)

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextActionCreator(text));
  }

  return (
    <div className="postsBlock">
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}/>
        </div>
        <div>
          <button onClick={() => {
            addPost()
          }}>Add new post
          </button>
        </div>
      </div>
      <div className="posts">
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts;