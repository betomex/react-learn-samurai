import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

type rootReducerType = typeof rootReducer //global state
export type appStateType = ReturnType<rootReducerType>

type propsTypes<T> = T extends {[key: string]: infer U} ? U : never
export type inferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<propsTypes<T>>
export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;