import React from 'react';

import './Header.css';
import Header from "./Header";
import {connect} from "react-redux";
import {deleteLogin, getAuth, setAuthUserData} from "../../redux/authReducer";

class HeaderComponent extends React.Component {
  componentDidMount() {
    this.props.getAuth();
  }

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
  setAuthUserData,
  getAuth,
  deleteLogin
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);