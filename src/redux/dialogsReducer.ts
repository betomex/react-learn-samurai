import {inferActionsTypes} from "./reduxStore";

type dialogsType = {
  id: number,
  name: string
}
type messagesType = {
  id: number,
  message: string
}
export type initialStateType = typeof initialState
type actionsType = inferActionsTypes<typeof actions>

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

const dialogsReducer = (state = initialState, action: actionsType): initialStateType => {
  switch (action.type) {
    case "DIALOGS/SEND-MESSAGE": {
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

export const actions = {
  sendMessage: (message: string) => ({type: 'DIALOGS/SEND-MESSAGE', newMessageText: message} as const)
}

export default dialogsReducer;