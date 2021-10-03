import React, {ComponentType} from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderComponent from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {appStateType} from "./redux/reduxStore";
import {UsersPage} from "./components/Users/UsersPage";
import { LoginPage } from './components/Login/LoginPage';

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
  initializeApp: () => void
}

class App extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {
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
              <UsersPage pageTitle={"Пользователи"}/>
            }/>
            <Route path="/login" render={() =>
              <LoginPage/>
            }/>
            {/*<Route path="" render={() => <div>404 NOT FOUND</div>}/>*/}
          </React.Suspense>
        </Switch>
      </div>
    </div>
  }
}

const mapStateToProps = (state: appStateType) => {
  return {
    initialized: state.app.initialized
  }
}

const mapDispatchToProps = {
  initializeApp
}

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);