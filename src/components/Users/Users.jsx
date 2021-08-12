import React from "react";
import userAvatar from "../../assets/images/98-988072_go-to-image-add-user-icon-clipart.png";
import './Users.css';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount && i <= 10; i++) { //TODO =======================================================
    pages.push(i);
  }

  return <div>
    <div>
      {pages.map(i => <span className={props.currentPage === i ? "selectedPage" : ""} key={i} onClick={() => {
        props.onCurrentPageChange(i)
      }}>{i}</span>)}
    </div>
    {props.users.map(u => <div key={u.id}>
      <span>
        <div>
          <img src={u.photos.small != null ? u.photos.small : userAvatar} alt="userLogo" className='userAvatar'/>
        </div>
        <div>
          {u.followed ? <button onClick={() => {
            props.unfollow(u.id)
          }}>Unfollow</button> : <button onClick={() => {
            props.follow(u.id)
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