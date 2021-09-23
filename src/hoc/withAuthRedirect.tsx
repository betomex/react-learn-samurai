import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {appStateType} from "../redux/reduxStore";

type propsTypes = {
  isAuth: boolean
}

const mapStateToPropsForRedirect = (state: appStateType) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export function withAuthRedirect<CP>(Component: React.ComponentType<CP>) {
  const RedirectComponent: React.FC<propsTypes> = (props) => {
    const {isAuth, ...restProps} = props

    if (!props.isAuth) {
      return <Redirect to={"/login"}/>
    }
    return <Component {...restProps as CP}/>
  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent);
}