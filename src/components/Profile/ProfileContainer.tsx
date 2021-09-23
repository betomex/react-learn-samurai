import React, {ComponentType} from 'react';
import './Profile.css';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserID, getStatusUserID, putPhoto, putProfile, putStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {appStateType} from "../../redux/reduxStore";
import {profileType} from "../../types/types";

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
  getProfileUserID: (userID: number) => void
  getStatusUserID: (userID: number) => void
  putStatus: (status: string) => void
  putPhoto: (file: File) => void
  putProfile: (profile: profileType) => Promise<any>
}
type pathParamsType = {
  userID: string
}
type propsType = mapStateToPropsType & mapDispatchToPropsType & RouteComponentProps<pathParamsType>;

class ProfileContainer extends React.Component<propsType> {
  updateProfile() {
    let userID: number | null = +this.props.match.params.userID;
    if (!userID) {
      userID = this.props.myUserID;
      if (!userID) {
        this.props.history.push("/login");
      }
    }

    this.props.getProfileUserID(userID as number);
    this.props.getStatusUserID(userID as number);
  }

  componentDidMount() {
    this.updateProfile();
  }

  componentDidUpdate(prevProps: propsType, prevState: propsType) {
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

const mapStateToProps = (state: appStateType) => {
  return {
    userProfile: state.profilePage.userProfile,
    status: state.profilePage.status,
    myUserID: state.auth.userID,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = {
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
)(ProfileContainer) as ComponentType;