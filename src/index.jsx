import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
  {id: 1, message: "Good day, how are you?", likesCount: 10},
  {id: 2, message: "That is my first post", likesCount: 2},
  {id: 3, message: "New Post", likesCount: 11},
  {id: 4, message: "Yet another", likesCount: 11},
];

let dialogs = [
  {id: 1, name: "Ilya"},
  {id: 2, name: "Makson"},
  {id: 3, name: "Oks"},
  {id: 4, name: "Ekaterina"},
  {id: 5, name: "Andrey"},
];

let messages = [
  {id: 1, message: "What a nice day today"},
  {id: 2, message: "It's the best way to relax"},
  {id: 3, message: "What do you think about going for a walk?"},
];

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
