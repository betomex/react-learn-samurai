import {stopSubmit} from "redux-form";
import {baseThunkType, inferActionsTypes} from "./reduxStore";
import {chatAPI, chatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";

export type initialStateType = typeof initialState;
type actionsType = inferActionsTypes<typeof actions>
type thunkType = baseThunkType<actionsType | ReturnType<typeof stopSubmit>>

let initialState = {
  messages: [] as chatMessageType[]
};

const chatReducer = (state = initialState, action: actionsType): initialStateType => {
  switch (action.type) {
    case "CHAT/SET_MESSAGES": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload]
      }
    }
    default:
      return state;
  }
}

export const actions = {
  setMessages: (messages: chatMessageType[]) => ({type: 'CHAT/SET_MESSAGES', payload: messages} as const)
}

let _newMessageHandler: ((messages: chatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.setMessages(messages))
    }
  }
  return _newMessageHandler
}

export const getMessages = (): thunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessages = (): thunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
}

export const sendMessage = (message: string): thunkType => async () => {
  chatAPI.sendMessage(message)
}

export default chatReducer;