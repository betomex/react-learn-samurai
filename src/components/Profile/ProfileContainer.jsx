import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserID, setUserProfile} from "../../redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = 2;
    }
    this.props.getProfileUserID(userID);
  }

  render() {
    if (!this.props.isAuth) {
      return <Redirect to={"/login"}/>
    }
    return (
      <div>
        <Profile {...this.props} userProfile={this.props.userProfile}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = {
  setUserProfile,
  getProfileUserID
}

const urlProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(urlProfileContainer);