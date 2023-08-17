import React from "react";

import classes from "./InputSearch.module.css";

const InputSearch = ({ searchText, onSearchText }) => {
  return (
    <div className={classes["label-box"]}>
      <label className={classes.label} htmlFor="search">
        Search by title
      </label>
      <input
        className={classes.input}
        id="search"
        value={searchText}
        onChange={(e) => {
          onSearchText(e.target.value);
        }}
      />
    </div>
  );
};

export default InputSearch;
