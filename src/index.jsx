import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

window.state = store.getState();

reportWebVitals();
