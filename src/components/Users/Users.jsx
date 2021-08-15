import React from "react";
import userAvatar from "../../assets/images/98-988072_go-to-image-add-user-icon-clipart.png";
import './Users.css';
import {NavLink} from "react-router-dom";
import * as axios from "axios";

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = pagesCount; i >= pagesCount - 10; i--) { //TODO =======================================================
    pages.push(i);
  }

  return <div>
    <div>
      {pages.map(i => <span className={props.currentPage === i ? "selectedPage" : ""} key={i} onClick={() => {
        props.onCurrentPageChange(i)
      }}>{i} </span>)}
    </div>
    {props.users.map(u => <div key={u.id}>
      <span>
        <div>
          <NavLink to={'/profile/' + u.id}>
            <img src={u.photos.small != null ? u.photos.small : userAvatar} alt="userLogo" className='userAvatar'/>
          </NavLink>
        </div>
        <div>
          {u.followed ? <button onClick={() => {
            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
              withCredentials: true,
              headers: {"API-KEY": "cf7b570a-c9c8-43b8-85da-682ef4236245"}
            }).then(r => {
              if (r.data.resultCode === 0) {
                props.unfollow(u.id);
              }
            });
          }}>Unfollow</button> : <button onClick={() => {
            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
              withCredentials: true,
              headers: {"API-KEY": "cf7b570a-c9c8-43b8-85da-682ef4236245"}
            }).then(r => {
              if (r.data.resultCode === 0) {
                props.follow(u.id);
              }
            });
          }}>Follow</button>}
        </div>
      </span>
      <span>
        <span>
          <div>{u.name}</div>
          <div>{u.status}</div>
        </span>
        <span>
          <div>{"u.location.city"}</div>
          <div>{"u.location.country"}</div>
        </span>
      </span>
    </div>)}
  </div>
}

export default Users;