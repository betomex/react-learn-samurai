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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let messageText = action.newMessageText;
      return {
        ...state,
        messages: [...state.messages, {id: 4, message: messageText}]
      };
    }
    default:
      return state;
  }
}

export const sendMessageActionCreator = (message) => ({type: SEND_MESSAGE, newMessageText: message})

export default dialogsReducer;