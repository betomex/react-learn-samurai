import React from 'react';

import './Header.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
    <header className='header'>
      <img
        src='https://www.ambiance-sticker.com/images/Image/sticker-origami-renard-intrigue-ambiance-sticker-col-SAND_A048.png'
        alt="logo"/>
      <div className="loginBlock">
        {props.isAuth
          ? <div>{props.login}
              <br/>
              <button onClick={props.deleteLogin}>Logout</button>
            </div>
          : <NavLink to={'/login'}>Login</NavLink>
        }
      </div>
    </header>
  );
}

export default Header;