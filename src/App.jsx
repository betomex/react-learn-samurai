import React from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderComponent from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

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
        <Switch>
          <React.Suspense fallback={<Preloader/>}>
            <Redirect from="/" to="/profile"/>
            <Route exact path="/dialogs" render={() =>
              <DialogsContainer/>
            }/>
            <Route path="/profile/:userID?" render={() =>
              <ProfileContainer/>
            }/>
            <Route path="/users" render={() =>
              <UsersContainer pageTitle={"Пользователи"}/>
            }/>
            <Route path="/login" render={() =>
              <Login/>
            }/>
            <Route path="" render={() => <div>404 NOT FOUND</div>}/>
          </React.Suspense>
        </Switch>
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