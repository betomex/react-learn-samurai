import {createSelector} from "reselect";
import {appStateType} from "./reduxStore";

const getUsers = (state: appStateType) => {
  return state.usersPage.users;
}

export const getUsersSelector = createSelector(getUsers,
  (users) => {
  return users.filter(u => true);
});

export const getPageSizeSelector = (state: appStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCountSelector = (state: appStateType) => {
  return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: appStateType) => {
  return state.usersPage.currentPage
}

export const getIsFetchingSelector = (state: appStateType) => {
  return state.usersPage.isFetching
}

export const getIsFollowingInProgressSelector = (state: appStateType) => {
  return state.usersPage.isFollowingInProgress
}