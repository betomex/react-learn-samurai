import React from 'react';

import './Header.css';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";
import {authAPI} from "../../api/api";

class HeaderComponent extends React.Component {
  componentDidMount() {
    authAPI.getAuth().then(data => {
      if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        this.props.setAuthUserData(id, email, login);
      }
    });
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
  setAuthUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);