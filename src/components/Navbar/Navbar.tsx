import React from 'react';

import './Navbar.css';
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {
  return <nav className="nav">
    <div className="navbar-item">
      <NavLink to="/profile" activeClassName="active">Profile</NavLink>
    </div>
    <div className="navbar-item">
      <NavLink to="/dialogs" activeClassName="active">Messages</NavLink>
    </div>
    <div className="navbar-item">
      <NavLink to="/users" activeClassName="active">Users</NavLink>
    </div>
    <div className="navbar-item">
      <NavLink to="news" activeClassName="active">News</NavLink>
    </div>
    <div className="navbar-item">
      <NavLink to="music" activeClassName="active">Music</NavLink>
    </div>
    <div className="navbar-item">
      <NavLink to="settings" activeClassName="active">Settings</NavLink>
    </div>
  </nav>
}

export default Navbar;