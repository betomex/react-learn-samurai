import {createSelector} from "reselect";
import {appStateType} from "../reduxStore";

const getUsers = (state: appStateType) => {
  return state.usersPage.users;
}

export const getUsersSelector = createSelector(getUsers,
  (users) => {
  return users.filter(u => u);
});

export const getPageSize = (state: appStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: appStateType) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: appStateType) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: appStateType) => {
  return state.usersPage.isFetching
}

export const getIsFollowingInProgress = (state: appStateType) => {
  return state.usersPage.isFollowingInProgress
}

export const getUsersFilter = (state: appStateType) => {
  return state.usersPage.filter
}