import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = 2;
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`).then(r => {
      this.props.setUserProfile(r.data);
    });
  }

  render() {
    return (
      <div>
        <Profile {...this.props} userProfile={this.props.userProfile}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profilePage.userProfile
  }
}

const mapDispatchToProps = {
  setUserProfile
}

const urlProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(urlProfileContainer);