import {updateObjectWithNewProps} from "../utils/reducersHandler";
import {usersType} from "../types/types";
import {baseThunkType, inferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";
import {followAPI} from "../api/followAPI";
import {responseType} from "../api/api";

export type initialStateType = typeof initialState
export type filterType = typeof initialState.filter
type actionsTypes = inferActionsTypes<typeof actions>
type followUnfollowACType = (userID: number) => actionsTypes
type thunkType = baseThunkType<actionsTypes>

let initialState = {
  users: [] as Array<usersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowingInProgress: [] as Array<number>, // array of users that is in progress
  filter: {
    term: "",
    friend: null as null | boolean
  }
};

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
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload
      }
    }
    default:
      return state;
  }
}

export const actions = {
  followSuccess: (userID: number) => ({type: 'FOLLOW', userID} as const),
  unfollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),
  setUsers: (users: Array<usersType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
  setFilter: (filter: filterType) => ({type: 'SET_FILTER', payload: filter} as const),
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

export const getUsers = (currentPage: number, pageSize: number, filter: filterType): thunkType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setFilter(filter))

  let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
  console.log(data)

  dispatch(actions.setCurrentPage(currentPage));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
  dispatch(actions.toggleIsFetching(false));
}

const _followUnfollow = async (dispatch: Dispatch<actionsTypes>,
                               userID: number,
                               apiMethod: (userID: number) => Promise<responseType>,
                               actionCreator: followUnfollowACType) => {
  dispatch(actions.toggleIsFollowingInProgress(true, userID));

  let data = await apiMethod(userID);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }
  dispatch(actions.toggleIsFollowingInProgress(false, userID));
}

export const postFollow = (userID: number): thunkType => async (dispatch) => {
  await _followUnfollow(dispatch, userID, followAPI.postFollow, actions.followSuccess);
}

export const deleteFollow = (userID: number): thunkType => async (dispatch) => {
  await _followUnfollow(dispatch, userID, followAPI.deleteFollow, actions.unfollowSuccess);
}

export default usersReducer;