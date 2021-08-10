import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";

let rerenderUI = () => {
  debugger
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rerenderUI(store.getState());

store.subscribe(rerenderUI);

reportWebVitals();
