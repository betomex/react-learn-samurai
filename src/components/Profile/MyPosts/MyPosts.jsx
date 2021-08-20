import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";

const MyPosts = (props) => {
  let postsElements = props.posts
    .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  let addNewPost = (values) => {
    props.addPost(values.postMessage);
  }

  return (
    <div className="postsBlock">
      <h3>My posts</h3>
      <AddPostReduxForm onSubmit={addNewPost}/>
      <div className="posts">
        {postsElements}
      </div>
    </div>
  );
}

const AddPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field component={"textarea"} placeholder={"message text..."} name={"postMessage"}/>
    </div>
    <div>
      <button>Add new post</button>
    </div>
  </form>
}

const AddPostReduxForm = reduxForm({
  form: "profileAddPostForm"
})(AddPostForm);

export default MyPosts;