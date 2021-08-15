import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/18999`).then(r => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);