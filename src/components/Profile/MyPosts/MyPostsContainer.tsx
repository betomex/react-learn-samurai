import './MyPosts.css';
import {actions} from "../../../redux/profileReducer";
import MyPostsMemo, {mapDispatchToPropsType, mapStateToPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {appStateType} from "../../../redux/reduxStore";

const mapStateToProps = (state: appStateType) => {
  return {
    posts: state.profilePage.posts
  }
}

const mapDispatchToProps = {
  addPost: actions.addPostActionCreator
}

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, appStateType>(
    mapStateToProps, mapDispatchToProps
)(MyPostsMemo);

export default MyPostsContainer;