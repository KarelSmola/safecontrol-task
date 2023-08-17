import React from "react";
import TableHeaderSort from "./TableHeaderSort";

import classes from "./TableHead.module.css";

const TableHead = ({ columns, sorting, onSortTable }) => {
  return (
    <thead>
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
