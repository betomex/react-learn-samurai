import {followAPI, usersAPI} from "../api/api";
import {updateObjectWithNewProps} from "../utils/reducersHandler";
import {usersType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE-IS-FOLLOWING-IN-PROGRESS';

let initialState = {
  users: [] as Array<usersType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1452,
  isFetching: true,
  isFollowingInProgress: [] as Array<number> // array of users that is in progress
};
type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectWithNewProps(state.users, action.userID, "id", {followed: true})
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectWithNewProps(state.users, action.userID, "id", {followed: false})
      }
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
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

type followSuccessType = {
  type: typeof FOLLOW,
  userID: number
}
export const followSuccess = (userID: number): followSuccessType => ({type: FOLLOW, userID})
type unfollowSuccessType = {
  type: typeof UNFOLLOW,
  userID: number
}
export const unfollowSuccess = (userID: number): unfollowSuccessType => ({type: UNFOLLOW, userID})
type setUsersType = {
  type: typeof SET_USERS,
  users: Array<usersType>
}
export const setUsers = (users: Array<usersType>): setUsersType => ({type: SET_USERS, users})
type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})
type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type toggleIsFollowingInProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS,
  isFollowingInProgress: boolean,
  userID: number
}
export const toggleIsFollowingInProgress = (isFollowingInProgress: boolean, userID: number): toggleIsFollowingInProgressType => ({
  type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
  isFollowingInProgress,
  userID
})

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
  dispatch(toggleIsFetching(true));

  let response = await usersAPI.getUsers(currentPage, pageSize);

  dispatch(setCurrentPage(currentPage));
  dispatch(setUsers(response.data.items));
  dispatch(setTotalUsersCount(response.data.totalCount));
  dispatch(toggleIsFetching(false));
}

const followUnfollow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleIsFollowingInProgress(true, userID));

  let data = await apiMethod(userID);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }
  dispatch(toggleIsFollowingInProgress(false, userID));
}

export const follow = (userID: number) => async (dispatch: any) => {
  followUnfollow(dispatch, userID, followAPI.postFollow, followSuccess);
}

export const unfollow = (userID: number) => async (dispatch: any) => {
  followUnfollow(dispatch, userID, followAPI.deleteFollow, unfollowSuccess);
}

export default usersReducer;