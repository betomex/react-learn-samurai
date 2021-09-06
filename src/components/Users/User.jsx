import React from "react";
import userAvatar from "../../assets/images/98-988072_go-to-image-add-user-icon-clipart.png";
import './Users.css';
import {NavLink} from "react-router-dom";

const User = ({user, isFollowingInProgress, follow, unfollow}) => {
  return <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : userAvatar} alt="userLogo" className='userAvatar'/>
          </NavLink>
        </div>
        <div>
          {user.followed ? <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={() => {
            unfollow(user.id);
          }}>Unfollow</button> : <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={() => {
            follow(user.id);
          }}>Follow</button>}
        </div>
      </span>
    <span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
      <span>
        <div>{"u.location.city"}</div>
        <div>{"u.location.country"}</div>
      </span>
    </span>
  </div>
}

export default User;