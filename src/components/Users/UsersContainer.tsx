import {connect} from "react-redux";
import {filterType, follow, getUsers, unfollow} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import '../common/Preloader/Preloader.css';
import Preloader from "../common/Preloader/Preloader";
import {
  getCurrentPageSelector,
  getIsFetchingSelector,
  getIsFollowingInProgressSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getUsersFilter,
  getUsersSelector
} from "../../redux/usersSelectors";
import {usersType} from "../../types/types";
import {appStateType} from "../../redux/reduxStore";
import {compose} from "redux";

type mapStateToPropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<usersType>
  isFollowingInProgress: Array<number>
  filter: filterType
}
type mapDispatchToPropsType = {
  follow: (userID: number) => void
  unfollow: (userID: number) => void
  getUsers: (currentPage: number, pageSize: number, filter: filterType) => void
}
type ownPropsType = {
  pageTitle: string
}
type propsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType

class UsersContainer extends React.Component<propsType> {
  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props
    this.props.getUsers(currentPage, pageSize, filter);
  }

  onCurrentPageChange = (page: number) => {
    const {pageSize, filter} = this.props
    this.props.getUsers(page, pageSize, filter);
  }

  onFilterChange = (filter: filterType) => {
    this.props.getUsers(1, this.props.pageSize, filter);
  }

  render() {
    return <>
      <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching ? <Preloader/> : null}
      <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          onCurrentPageChange={this.onCurrentPageChange}
          onFilterChange={this.onFilterChange}
          isFollowingInProgress={this.props.isFollowingInProgress}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
      />
    </>
  }
}

const mapStateToProps = (state: appStateType): mapStateToPropsType => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    isFollowingInProgress: getIsFollowingInProgressSelector(state),
    filter: getUsersFilter(state)
  }
}

const mapDispatchToProps = {
  getUsers,
  follow,
  unfollow
}

export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, appStateType>(mapStateToProps, mapDispatchToProps)
)(UsersContainer)