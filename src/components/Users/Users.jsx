import React from "react";
import './Users.css';

const Users = (props) => {
  let usersElements = props.users.map(u => <div key={u.id}>
      <span>
        <div>
          <img src={u.avatarUrl} alt="userLogo" className='userAvatar'/>
        </div>
        <div>
          {u.followed
            ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
            : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
        </div>
      </span>
      <span>
        <span>
          <div>{u.fullName}</div>
          <div>{u.status}</div>
        </span>
        <span>
          <div>{u.location.city}</div>
          <div>{u.location.country}</div>
        </span>
      </span>
    </div>
  )

  return <div>
    {usersElements}
  </div>
}

export default Users;