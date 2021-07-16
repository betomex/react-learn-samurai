import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/state";
import ReactDOM from 'react-dom';
import App from './App';

let rerenderUI = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={store.getState()}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rerenderUI(store.getState());

store.subscribe(rerenderUI);

reportWebVitals();
