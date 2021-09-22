import {stopSubmit} from "redux-form";
import {photosType, postsType, profileType } from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {baseThunkType, inferActionsTypes} from "./reduxStore";

export type initialStateType = typeof initialState
type actionsType = inferActionsTypes<typeof actions>
type thunkType = baseThunkType<actionsType | ReturnType<typeof stopSubmit>>

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

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
  switch (action.type) {
    case "PROFILE/ADD-POST": {
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
    case "PROFILE/DELETE-POST": {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postID),
      };
    }
    case "PROFILE/SET-USER-PROFILE": {
      return {
        ...state,
        userProfile: action.userProfile
      }
    }
    case "PROFILE/SET-STATUS": {
      return {
        ...state,
        status: action.status
      }
    }
    case "PROFILE/SET-PHOTO": {
      return {
        ...state,
        userProfile: {...state.userProfile, photos: action.photos} as profileType
      }
    }
    default:
      return state;
  }
}

export const actions = {
  addPostActionCreator: (text: string) => ({type: 'PROFILE/ADD-POST', newPostText: text} as const),
  deletePost: (postID: number) => ({type: 'PROFILE/DELETE-POST', postID} as const),
  setUserProfile: (userProfile: profileType) => ({type: 'PROFILE/SET-USER-PROFILE', userProfile} as const),
  setStatus: (status: string) => ({type: 'PROFILE/SET-STATUS', status} as const),
  setPhoto: (photos: photosType) => ({type: 'PROFILE/SET-PHOTO', photos} as const)
}

export const getProfileUserID = (userID: number): thunkType => async (dispatch) => {
  let data = await profileAPI.getProfileUserID(userID);

  dispatch(actions.setUserProfile(data));
}

export const getStatusUserID = (userID: number): thunkType => async (dispatch) => {
  let data = await profileAPI.getStatusUserID(userID);

  dispatch(actions.setStatus(data));
}

export const putStatus = (status: string): thunkType => async (dispatch) => {
  let data = await profileAPI.putStatus(status);

  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
}

export const putPhoto = (file: File): thunkType => async (dispatch) => {
  let data = await profileAPI.putPhoto(file);

  if (data.resultCode === 0) {
    dispatch(actions.setPhoto(data.data.photos));
  }
}

export const putProfile = (profile: profileType): thunkType => async (dispatch, getState) => {
  const userID = getState().auth.userID;
  let data = await profileAPI.putProfile(profile);

  if (data.resultCode === 0) {
    if (userID !== null) {
      dispatch(getProfileUserID(userID));
    } else {
      throw new Error("userID can't be null!")
    }
  } else {
    dispatch(stopSubmit("profileUpdateForm", {_error: data.messages[0]}));
    return Promise.reject(data.messages[0]);
  }
}

export default profileReducer;