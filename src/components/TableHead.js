import React from "react";

import classes from "./TableHead.module.css";

export const TableHead = ({ requestSorting, sortConfig }) => {
  const getArrow = (name) => {
    if (!sortConfig) {
      return;
    }

    if (sortConfig.column === name) {
      return sortConfig.direction === "ascending"
        ? `${classes.ascending}`
        : `${classes.descending}`;
    }
  };

  return (
    <thead className={classes["table-head"]}>
      {
        <tr>
          <th
            className={getArrow("id")}
            onClick={() => {
              requestSorting("id");
            }}
          >
            ID
          </th>
          <th
            className={getArrow("title")}
            onClick={() => {
              requestSorting("title");
            }}
          >
            Title
          </th>
          <th
            className={getArrow("description")}
            onClick={() => {
              requestSorting("description");
            }}
          >
            Description
          </th>
        </tr>
      }
    </thead>
  );
};
