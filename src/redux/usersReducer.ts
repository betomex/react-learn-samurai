import {followAPI, usersAPI} from "../api/api";
import {updateObjectWithNewProps} from "../utils/reducersHandler";
import {usersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType, inferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";

let initialState = {
  users: [] as Array<usersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1452,
  isFetching: true,
  isFollowingInProgress: [] as Array<number> // array of users that is in progress
};
type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: actionsTypes): initialStateType => {
  switch (action.type) {
    case "FOLLOW": {
      return {
        ...state,
        users: updateObjectWithNewProps(state.users, action.userID, "id", {followed: true})
      }
    }
    case "UNFOLLOW": {
      return {
        ...state,
        users: updateObjectWithNewProps(state.users, action.userID, "id", {followed: false})
      }
    }
    case "SET_USERS": {
      return {
        ...state,
        users: action.users
      }
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case "TOGGLE_IS_FOLLOWING_IN_PROGRESS": {
      return {
        ...state,
        isFollowingInProgress: action.isFollowingInProgress
            ? [...state.isFollowingInProgress, action.userID]
            : state.isFollowingInProgress.filter(id => id !== action.userID)
      }
    }
    default:
      return state;
  }
}

type actionsTypes = inferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userID: number) => ({type: 'FOLLOW', userID} as const),
  unfollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),
  setUsers: (users: Array<usersType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
  toggleIsFollowingInProgress: (isFollowingInProgress: boolean, userID: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_IN_PROGRESS',
    isFollowingInProgress,
    userID
  } as const)
}

type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsTypes>
type dispatchType = Dispatch<actionsTypes>
type followUnfollowACType = (userID: number) => actionsTypes

export const getUsers = (currentPage: number, pageSize: number): thunkType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true));
  let response = await usersAPI.getUsers(currentPage, pageSize);

  dispatch(actions.setCurrentPage(currentPage));
  dispatch(actions.setUsers(response.data.items));
  dispatch(actions.setTotalUsersCount(response.data.totalCount));
  dispatch(actions.toggleIsFetching(false));
}

const _followUnfollow = async (dispatch: dispatchType, userID: number, apiMethod: any, actionCreator: followUnfollowACType) => {
  dispatch(actions.toggleIsFollowingInProgress(true, userID));

  let data = await apiMethod(userID);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }
  dispatch(actions.toggleIsFollowingInProgress(false, userID));
}

export const follow = (userID: number): thunkType => async (dispatch) => {
  _followUnfollow(dispatch, userID, followAPI.postFollow, actions.followSuccess);
}

export const unfollow = (userID: number): thunkType => async (dispatch) => {
  _followUnfollow(dispatch, userID, followAPI.deleteFollow, actions.unfollowSuccess);
}

export default usersReducer;