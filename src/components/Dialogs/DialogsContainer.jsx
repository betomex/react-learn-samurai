import React from 'react';
import './Dialogs.css';
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
  let dialogsPage = props.store.getState().dialogsPage;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageActionCreator());
  }

  let onNewMessageChange = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text));
  }

  return <Dialogs
    updateNewMessageText={onNewMessageChange}
    sendMessage={onSendMessageClick}
    dialogsPage={dialogsPage}
  />
}

export default DialogsContainer;