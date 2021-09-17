import React from "react";
import './Users.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {usersType} from "../../types/types";

type propsTypes = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onCurrentPageChange: (pageNumber: number) => void
  users: Array<usersType>
  isFollowingInProgress: Array<number>
  follow: (userID: number) => void
  unfollow: (userID: number) => void
}

const Users: React.FC<propsTypes> = (
        {totalUsersCount, pageSize, currentPage, onCurrentPageChange, users, ...props}
        ) => {
  return <div>
    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
               onCurrentPageChange={onCurrentPageChange}/>
    <div>
      {users.map(u => <User key={u.id} user={u} isFollowingInProgress={props.isFollowingInProgress}
                                  follow={props.follow} unfollow={props.unfollow}/>)}
    </div>
  </div>
}

export default Users;