import React from "react";

import classes from "./IDlist.module.css";

const IDlist = ({ ids }) => {
  return (
    <div className={classes["ids-list"]}>
      <h1 className={classes["ids-title"]}>Selected IDs</h1>
      {ids
        .filter((id) => id.selected)
        .map((id) => (
          <p key={id.id}>{`${id.id}, `}</p>
        ))}
    </div>
  );
};

export default IDlist;
