import {getAuth} from "./authReducer";
import {inferActionsTypes} from "./reduxStore";

export type initialStateType = typeof initialState
type actionsType = inferActionsTypes<typeof actions>

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action: actionsType): initialStateType => {
  switch (action.type) {
    case "APP/SET-INITIALIZED-SUCCESS": {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state;
  }
}

export const actions = {
  setInitializedSuccess: () => ({type: 'APP/SET-INITIALIZED-SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(actions.setInitializedSuccess());
  });
}

export default appReducer;