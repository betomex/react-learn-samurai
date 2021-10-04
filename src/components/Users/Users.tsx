import React, {useEffect} from "react";
import './Users.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {deleteFollow, filterType, getUsers, postFollow} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage,
  getIsFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  getUsersSelector
} from "../../redux/selectors/usersSelectors";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

export const Users: React.FC = () => {
  const users = useSelector(getUsersSelector)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const isFollowingInProgress = useSelector(getIsFollowingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const parsedSearch = queryString.parse(history.location.search.substr(1)) as { term: string, friend: string, page: string }
    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsedSearch.page) actualPage = Number(parsedSearch.page)
    if (!!parsedSearch.term) actualFilter = {...actualFilter, term: parsedSearch.term as string}
    if (!!parsedSearch.friend) actualFilter =
      {...actualFilter, friend: parsedSearch.friend === "null" ? null : parsedSearch.friend === "true"}

    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    history.push({
      pathname: '/developers',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter, currentPage])

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