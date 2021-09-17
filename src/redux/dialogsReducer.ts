const SEND_MESSAGE = 'SEND-MESSAGE';

type dialogsType = {
  id: number,
  name: string
}
type messagesType = {
  id: number,
  message: string
}
let initialState = {
  dialogs: [
    {id: 1, name: "Ilya"},
    {id: 2, name: "Makson"},
    {id: 3, name: "Oks"},
    {id: 4, name: "Ekaterina"},
    {id: 5, name: "Andrey"},
  ] as Array<dialogsType>,
  messages: [
    {id: 1, message: "What a nice day today"},
    {id: 2, message: "It's the best way to relax"},
    {id: 3, message: "What do you think about going for a walk?"},
  ] as Array<messagesType>,
};
export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): initialStateType => {
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

type sendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE,
  newMessageText: string
}
export const sendMessageActionCreator = (message: string): sendMessageActionCreatorType => ({type: SEND_MESSAGE, newMessageText: message})

export default dialogsReducer;