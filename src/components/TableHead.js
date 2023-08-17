import React from "react";
import TableHeaderSort from "./TableHeaderSort";

import classes from "./TableHead.module.css";

const TableHead = ({ columns, sorting, onSortTable }) => {
  return (
    <thead className={classes["table-head"]}>
      {
        <tr>
          {columns.map((column) => (
            <TableHeaderSort
              key={column}
              column={column}
              sorting={sorting}
              onSortTable={onSortTable}
            />
          ))}
        </tr>
      }
    </thead>
  );
};

export default TableHead;
