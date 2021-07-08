import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {rerenderUI} from "./render";
import state from "./redux/state";

rerenderUI(state);

reportWebVitals();
