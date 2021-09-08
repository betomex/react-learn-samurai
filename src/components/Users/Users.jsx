import React from "react";
import './Users.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({totalUsersCount, pageSize, currentPage, onCurrentPageChange, ...props}) => {
  return <div>
    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
               onCurrentPageChange={onCurrentPageChange}/>
    <div>
      {props.users.map(u => <User key={u.id} user={u} isFollowingInProgress={props.isFollowingInProgress}
                                  follow={props.follow} unfollow={props.unfollow}/>)}
    </div>
  </div>
}

export default Users;