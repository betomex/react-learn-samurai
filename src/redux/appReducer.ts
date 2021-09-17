import {getAuth} from "./authReducer";

const SET_INITIALIZED_SUCCESS = 'SET-INITIALIZED-SUCCESS';

export type initialStateType = {
  initialized: boolean
}

let initialState: initialStateType = {
  initialized: false
};

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state;
  }
}

export type setInitializedSuccessActionType = {
  type: typeof SET_INITIALIZED_SUCCESS
}

export const setInitializedSuccess = (): setInitializedSuccessActionType => ({type: SET_INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  });
}

export default appReducer;