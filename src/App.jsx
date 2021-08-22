import React from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderComponent from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return <div className='app-wrapper'>
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
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

const mapDispatchToProps = {
  initializeApp
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);