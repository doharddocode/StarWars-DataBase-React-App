import React from 'react';

import "./page-not-found.css"
import icon from "./404-icon.png"

const PageNotFound = () => {
  return (
    <div className="page-404">
      <img src={icon} alt="404 icon"/>
      <span className="boom">Page Not Found!</span>
    </div>
  );
};

export default PageNotFound;
