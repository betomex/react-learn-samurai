import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import chatReducer from "./chatReducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer
});

type rootReducerType = typeof rootReducer //global state
export type appStateType = ReturnType<rootReducerType>

export type inferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never
export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;