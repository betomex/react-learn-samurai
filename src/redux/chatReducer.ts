import {stopSubmit} from "redux-form";
import {baseThunkType, inferActionsTypes} from "./reduxStore";
import {chatAPI, chatMessageType, statusType} from "../api/chatAPI";
import {Dispatch} from "redux";
import {v1} from 'uuid'

export type initialStateType = typeof initialState;
type actionsType = inferActionsTypes<typeof actions>
type thunkType = baseThunkType<actionsType | ReturnType<typeof stopSubmit>>
type chatMessageWithIDType = chatMessageType & {id: string}

let initialState = {
  messages: [] as chatMessageWithIDType[],
  status: 'pending' as statusType
};

const chatReducer = (state = initialState, action: actionsType): initialStateType => {
  switch (action.type) {
    case "CHAT/SET_MESSAGES": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload]
          .map(m => ({...m, id: v1()}))
          .filter((m, index, array) => index >= array.length - 100)
      }
    }
    case "CHAT/SET_STATUS": {
      return {
        ...state,
        status: action.payload
      }
    }
    default:
      return state;
  }
}

export const actions = {
  setMessages: (messages: chatMessageType[]) => ({type: 'CHAT/SET_MESSAGES', payload: messages} as const),
  setStatus: (status: statusType) => ({type: 'CHAT/SET_STATUS', payload: status} as const)
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

let _newStatusHandler: ((status: statusType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusHandler === null) {
    _newStatusHandler = (status) => {
      dispatch(actions.setStatus(status))
    }
  }
  return _newStatusHandler
}

export const getMessages = (): thunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe("message", newMessagesHandlerCreator(dispatch))
  chatAPI.subscribe("status", newStatusHandlerCreator(dispatch))
}

export const stopMessages = (): thunkType => async (dispatch) => {
  chatAPI.unsubscribe("message", newMessagesHandlerCreator(dispatch))
  chatAPI.unsubscribe("status", newStatusHandlerCreator(dispatch))
}

export const sendMessage = (message: string): thunkType => async () => {
  chatAPI.sendMessage(message)
}

export default chatReducer;