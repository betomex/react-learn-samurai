import React from 'react';

import './Header.css';
import Header from "./Header";
import {connect} from "react-redux";
import {deleteLogin} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

const mapDispatchToProps = {
  deleteLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);