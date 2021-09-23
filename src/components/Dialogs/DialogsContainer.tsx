import './Dialogs.css';
import {actions} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {appStateType} from "../../redux/reduxStore";
import {ComponentType} from "react";

let mapStateToProps = (state: appStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = {...actions}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs) as ComponentType;