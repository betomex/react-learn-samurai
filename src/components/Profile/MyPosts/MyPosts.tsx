import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import {postsType} from "../../../types/types";
import { AddPostReduxForm } from './MyPostsForm';

export type mapStateToPropsType = {
  posts: Array<postsType>
}
export type mapDispatchToPropsType = {
  addPost: (message: string) => void
}
type addPostFormType = {
  postMessage: string
}

const MyPosts: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
  let postsElements = props.posts
      .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  let addNewPost = (values: addPostFormType) => {
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
};

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo;