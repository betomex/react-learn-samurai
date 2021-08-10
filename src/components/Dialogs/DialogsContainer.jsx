import React from 'react';
import './Dialogs.css';
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {
  return <StoreContext.Consumer>
    {(store) => {
      let dialogsPage = store.getState().dialogsPage;

      let onSendMessageClick = () => {
        store.dispatch(sendMessageActionCreator());
      }

      let onNewMessageChange = (text) => {
        store.dispatch(updateNewMessageTextActionCreator(text));
      }

      return <Dialogs
        updateNewMessageText={onNewMessageChange}
        sendMessage={onSendMessageClick}
        dialogsPage={dialogsPage}
      />
    }}
  </StoreContext.Consumer>
}

export default DialogsContainer;