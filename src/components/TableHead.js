import React from "react";

import classes from "./TableHead.module.css";

const TableHead = ({ columns }) => {
  return (
    <thead>
      {
        <tr>
          {columns.map((column) => (
            <th className={classes["head-cell"]} key={column}>
              {column}
            </th>
          ))}
        </tr>
      }
    </thead>
  );
};

export default TableHead;
