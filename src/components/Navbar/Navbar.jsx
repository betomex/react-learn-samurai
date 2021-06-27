import React from 'react';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className="navbar-item">
        <a href="/profile">Profile</a>
      </div>
      <div className="navbar-item">
        <a href="/dialogs">Messages</a>
      </div>
      <div className="navbar-item">
        <a>News</a>
      </div>
      <div className="navbar-item">
        <a>Music</a>
      </div>
      <div className="navbar-item">
        <a>Settings</a>
      </div>
    </nav>
  );
}

export default Navbar;