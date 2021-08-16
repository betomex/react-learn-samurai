const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  dialogs: [
    {id: 1, name: "Ilya"},
    {id: 2, name: "Makson"},
    {id: 3, name: "Oks"},
    {id: 4, name: "Ekaterina"},
    {id: 5, name: "Andrey"},
  ],
  messages: [
    {id: 1, message: "What a nice day today"},
    {id: 2, message: "It's the best way to relax"},
    {id: 3, message: "What do you think about going for a walk?"},
  ],
  newMessageText: "",
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT: {
      return {
        ...state,
        newMessageText: action.newMText
      };
    }
    case SEND_MESSAGE: {
      let messageText = state.newMessageText;
      return {
        ...state,
        newMessageText: '',
        messages: [...state.messages, {id: 4, message: messageText}]
      };
    }
    default:
      return state;
  }
}

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMText: text})

export default dialogsReducer;