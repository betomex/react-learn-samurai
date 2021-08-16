import React from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderComponent from "./components/Header/HeaderComponent";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <HeaderComponent/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route exact path="/dialogs" render={() =>
            <DialogsContainer/>
          }/>
          <Route path="/profile/:userID?" render={() =>
            <ProfileContainer/>
          }/>
          <Route path="/users" render={() =>
            <UsersContainer/>
          }/>
          <Route path="/login" render={() =>
            <Login/>
          }/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;