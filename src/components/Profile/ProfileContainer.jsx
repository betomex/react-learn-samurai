import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
  getProfileUserID,
  getStatusUserID,
  putPhoto,
  putProfile,
  putStatus,
  setUserProfile
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
  updateProfile() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = this.props.myUserID;
      if (!userID) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfileUserID(userID);
    this.props.getStatusUserID(userID);
  }

  componentDidMount() {
    this.updateProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.updateProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile {...this.props} userProfile={this.props.userProfile} status={this.props.status}
                 putStatus={this.props.putStatus} isOwner={!this.props.match.params.userID}
                 putPhoto={this.props.putPhoto} putProfile={this.props.putProfile}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile,
    status: state.profilePage.status,
    myUserID: state.auth.userID,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = {
  setUserProfile,
  getProfileUserID,
  getStatusUserID,
  putStatus,
  putPhoto,
  putProfile
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer);