import React from "react";
import './Users.css';
import userAvatar from "../../assets/images/98-988072_go-to-image-add-user-icon-clipart.png";
import * as axios from "axios";

class Users extends React.Component {
  constructor(props) {
    super(props);

    axios.get("https://social-network.samuraijs.com/api/1.0/users").then(r => {
      this.props.setUsers(r.data.items);
    });
  }

  render() {
    return <div>
      {this.props.users.map(u => <div key={u.id}>
      <span>
        <div>
          <img src={u.photos.small != null ? u.photos.small : userAvatar} alt="userLogo" className='userAvatar'/>
        </div>
        <div>
          {u.followed ? <button onClick={() => {
            this.props.unfollow(u.id)
          }}>Unfollow</button> : <button onClick={() => {
            this.props.follow(u.id)
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
}

export default Users;