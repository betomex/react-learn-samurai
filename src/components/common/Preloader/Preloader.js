import preloader from "../../../assets/images/loading.gif";
import React from "react";
import './Preloader.css';

const Preloader = () => {
  return <div>
    <img src={preloader} className="preloader" alt="loading"/>
  </div>
}

export default Preloader;