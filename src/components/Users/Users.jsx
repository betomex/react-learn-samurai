import React from "react";
import './Users.css';
import userAvatar from "../../assets/images/98-988072_go-to-image-add-user-icon-clipart.png";
import * as axios from "axios";

class Users extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(r => {
      this.props.setUsers(r.data.items);
      this.props.setTotalUsersCount(r.data.totalCount);
    });
  }

  onCurrentPageChange = (page) => {
    this.props.setCurrentPage(page);

    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(r => {
      this.props.setUsers(r.data.items);
    });
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return <div>
      <div>
        {pages.map(i => <span className={this.props.currentPage === i ? "selectedPage" : ""} onClick={() => {
          this.onCurrentPageChange(i)
        }}>{i}</span>)}
      </div>
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