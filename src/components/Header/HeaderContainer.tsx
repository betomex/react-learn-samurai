import React from 'react';

import './Header.css';
import Header, {dispatchPropsType, mapPropsType} from "./Header";
import {connect} from "react-redux";
import {deleteLogin} from "../../redux/authReducer";
import {appStateType} from "../../redux/reduxStore";

class HeaderContainer extends React.Component<mapPropsType & dispatchPropsType> {
  render() {
    return (
      <Header {...this.props}/>
    );
  }
}

const mapStateToProps = (state: appStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

const mapDispatchToProps = {
  deleteLogin
}

export default connect<mapPropsType, dispatchPropsType, {}, appStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);