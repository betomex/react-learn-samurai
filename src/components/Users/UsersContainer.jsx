import {connect} from "react-redux";
import {
  follow,
  followSuccess,
  getUsers,
  setCurrentPage,
  toggleIsFollowingInProgress,
  unfollow,
  unfollowSuccess
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import '../common/Preloader/Preloader.css';
import Preloader from "../common/Preloader/Preloader";
import {
  getCurrentPageSelector, getIsFetchingSelector, getIsFollowingInProgressSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getUsersSelector
} from "../../redux/usersSelectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onCurrentPageChange = (page) => {
    this.props.getUsers(page, this.props.pageSize);
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        users={this.props.users}
        onCurrentPageChange={this.onCurrentPageChange}
        isFollowingInProgress={this.props.isFollowingInProgress}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
      />
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    isFollowingInProgress: getIsFollowingInProgressSelector(state)
  }
}

const mapDispatchToProps = {
  followSuccess,
  unfollowSuccess,
  setCurrentPage,
  toggleIsFollowingInProgress,
  getUsers,
  follow,
  unfollow
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);