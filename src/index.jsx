import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import ReactDOM from 'react-dom';
import App from './App';

let rerenderUI = (state) => {
  debugger
  ReactDOM.render(
    <React.StrictMode>
      <App store={store}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rerenderUI(store.getState());

store.subscribe(rerenderUI);

reportWebVitals();
