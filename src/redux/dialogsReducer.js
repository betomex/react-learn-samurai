const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.newMText;

      return state;
    case SEND_MESSAGE:
      let messageText = state.newMessageText;
      state.newMessageText = '';
      state.messages.push({id: 4, message: messageText});

      return state;

    default:
      return state;

  }
}

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMText: text})

export default dialogsReducer;