import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';

let initialState = {
  posts: [
    {id: 1, message: "Good day, how are you?", likesCount: 10},
    {id: 2, message: "That is my first post", likesCount: 2},
    {id: 3, message: "New Post", likesCount: 11},
    {id: 4, message: "Yet another", likesCount: 11},
  ],
  userProfile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postID),
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile : action.userProfile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    default:
      return state;
  }
}

export const addPostActionCreator = (text) => ({type: ADD_POST, newPostText: text})
export const deletePost = (postID) => ({type: DELETE_POST, postID})
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getProfileUserID = (userID) => {
  return (dispatch) => {
    profileAPI.getProfileUserID(userID).then(data => {
      dispatch(setUserProfile(data));
    });
  }
}

export const getStatusUserID = (userID) => {
  return (dispatch) => {
    profileAPI.getStatusUserID(userID).then(data => {
      dispatch(setStatus(data));
    });
  }
}

export const putStatus = (status) => {
  return (dispatch) => {
    profileAPI.putStatus(status).then(r => {
      if (r.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  }
}

export default profileReducer;