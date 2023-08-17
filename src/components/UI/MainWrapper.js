import React from "react";

import classes from "./MainWrapper.module.css";

const MainWrapper = ({ children, className }) => {
  return <main className={`${className} ${classes.main}`}>{children}</main>;
};

export default MainWrapper;
