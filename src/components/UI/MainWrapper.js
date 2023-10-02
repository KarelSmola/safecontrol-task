import React from "react";

import classes from "./MainWrapper.module.css";

export const MainWrapper = ({ children, className }) => {
  return <main className={`${className} ${classes.main}`}>{children}</main>;
};
