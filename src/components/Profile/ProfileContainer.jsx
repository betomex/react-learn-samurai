import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserID, setUserProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = 2;
    }
    this.props.getProfileUserID(userID);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} userProfile={this.props.userProfile}/>
      </div>
    );
  }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile,
  }
}

const mapDispatchToProps = {
  setUserProfile,
  getProfileUserID
}

const urlProfileContainer = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, mapDispatchToProps)(urlProfileContainer);