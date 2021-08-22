import {getAuth} from "./authReducer";

const SET_INITIALIZED_SUCCESS = 'SET-INITIALIZED-SUCCESS';

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
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

export const setInitializedSuccess = () => ({type: SET_INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuth());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  });
}

export default appReducer;