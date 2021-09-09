import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_PHOTO = 'SET-PHOTO';

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
        userProfile: action.userProfile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case SET_PHOTO: {
      return {
        ...state,
        userProfile: {...state.userProfile, photos: action.photos}
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
export const setPhoto = (photos) => ({type: SET_PHOTO, photos})

export const getProfileUserID = (userID) => async (dispatch) => {
  let response = await profileAPI.getProfileUserID(userID);

  dispatch(setUserProfile(response.data));
}

export const getStatusUserID = (userID) => async (dispatch) => {
  let response = await profileAPI.getStatusUserID(userID);

  dispatch(setStatus(response.data));
}

export const putStatus = (status) => async (dispatch) => {
  let response = await profileAPI.putStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export const putPhoto = (file) => async (dispatch) => {
  let response = await profileAPI.putPhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(setPhoto(response.data.data.photos));
  }
}

export const putProfile = (profile) => async (dispatch, getState) => {
  const userID = getState().auth.userID;
  let response = await profileAPI.putProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getProfileUserID(userID));
  } else {
    dispatch(stopSubmit("profileUpdateForm", {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0]);
  }
}

export default profileReducer;