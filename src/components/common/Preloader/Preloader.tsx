import preloader from "../../../assets/images/loading.gif";
import React from "react";
import './Preloader.css';

const Preloader: React.FC = () => {
  return <div>
    <img src={preloader} className="preloader" alt="loading"/>
  </div>
}

export default Preloader;