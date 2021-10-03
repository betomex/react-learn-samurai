import React, {useEffect} from "react";
import './Users.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {filterType, getUsers, postFollow, deleteFollow} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage,
  getIsFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  getUsersSelector
} from "../../redux/selectors/usersSelectors";

export const Users: React.FC = () => {
  const users = useSelector(getUsersSelector)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const isFollowingInProgress = useSelector(getIsFollowingInProgress)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter))
  }, [])

  const onCurrentPageChange = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter))
  }

  const onFilterChange = (filter: filterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }

  const follow = (userID: number) => {
    dispatch(postFollow(userID))
  }

  const unfollow = (userID: number) => {
    dispatch(deleteFollow(userID))
  }

  return <div>
    <UsersSearchForm onFilterChange={onFilterChange}/>

    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
               onCurrentPageChange={onCurrentPageChange}/>
    <div>
      {users.map(u => <User key={u.id} user={u} isFollowingInProgress={isFollowingInProgress}
                            follow={follow} unfollow={unfollow}/>)}
    </div>
  </div>
}