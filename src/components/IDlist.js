import React from "react";

import classes from "./IDlist.module.css";

export const IDlist = ({ ids }) => {
  return (
    <div className={classes["ids-wrapper"]}>
      <h1 className={classes["ids-title"]}>Selected IDs</h1>
      <div className={classes["ids-list"]}>
        {ids
          .filter((id) => id.selected)
          .map((id) => (
            <p key={id.id}>{`${id.id}, `}</p>
          ))}
      </div>
    </div>
  );
};
