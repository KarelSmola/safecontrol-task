import React from "react";

import classes from "./InputSearch.module.css";

export const InputSearch = ({ searchText, onSearchText }) => {
  const inputChangeHandler = (e) => {
    onSearchText(e.target.value);
  };

  return (
    <div className={classes["label-box"]}>
      <label className={classes.label} htmlFor="search">
        Search by title
      </label>
      <input
        className={classes.input}
        id="search"
        value={searchText}
        onChange={inputChangeHandler}
      />
    </div>
  );
};
