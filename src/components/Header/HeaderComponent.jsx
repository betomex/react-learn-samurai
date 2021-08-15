import React from 'react';

import './Header.css';
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";

class HeaderComponent extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(r => {
      if (r.data.resultCode === 0) {
        let {id, email, login} = r.data.data;
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