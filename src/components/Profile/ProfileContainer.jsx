import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserID, getStatusUserID, putStatus, setUserProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = 18943;
    }
    this.props.getProfileUserID(userID);
    this.props.getStatusUserID(userID);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} userProfile={this.props.userProfile} status={this.props.status}
                 putStatus={this.props.putStatus}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile,
    status: state.profilePage.status
  }
}

const mapDispatchToProps = {
  setUserProfile,
  getProfileUserID,
  getStatusUserID,
  putStatus
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer);