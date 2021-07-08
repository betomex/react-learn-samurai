import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {addPost, subscribe, updateNewPostText} from "./redux/state";
import ReactDOM from 'react-dom';
import App from './App';

let rerenderUI = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App appState={state} addPost={addPost} updateNewPostText={updateNewPostText} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rerenderUI(state);

subscribe(rerenderUI);

reportWebVitals();
