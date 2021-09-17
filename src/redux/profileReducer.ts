import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsType, profileType } from "../types/types";

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
  ] as Array<postsType>,
  userProfile: null as profileType | null,
  status: ""
};
export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
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
        userProfile: {...state.userProfile, photos: action.photos} as profileType
      }
    }
    default:
      return state;
  }
}

type addPostActionCreatorType = {
  type: typeof ADD_POST,
  newPostText: string
}
export const addPostActionCreator = (text: string): addPostActionCreatorType => ({type: ADD_POST, newPostText: text})
type deletePostType = {
  type: typeof DELETE_POST,
  postID: number
}
export const deletePost = (postID: number): deletePostType => ({type: DELETE_POST, postID})
type setUserProfileType = {
  type: typeof SET_USER_PROFILE,
  userProfile: profileType
}
export const setUserProfile = (userProfile: profileType): setUserProfileType => ({type: SET_USER_PROFILE, userProfile})
type setStatusType = {
  type: typeof SET_STATUS,
  status: string
}
export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status})
type setPhotoType = {
  type: typeof SET_PHOTO,
  photos: photosType
}
export const setPhoto = (photos: photosType): setPhotoType => ({type: SET_PHOTO, photos})

export const getProfileUserID = (userID: number) => async (dispatch: any) => {
  let response = await profileAPI.getProfileUserID(userID);

  dispatch(setUserProfile(response.data));
}

export const getStatusUserID = (userID: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatusUserID(userID);

  dispatch(setStatus(response.data));
}

export const putStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.putStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export const putPhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.putPhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(setPhoto(response.data.data.photos));
  }
}

export const putProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
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