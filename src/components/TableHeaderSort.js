import React from "react";

import classes from "./TableHeaderSort.module.css";

const TableHeaderSort = ({ column, sorting, onSortTable }) => {
  const desOrder = sorting.column === column && sorting.order === "des";
  const ascOrder = sorting.column === column && sorting.order === "asc";
  const toggleOrder = desOrder ? "asc" : "des";

  const sortTable = () => {
    onSortTable({ column, order: toggleOrder });
  };

  return (
    <th className={classes["head-cell"]} onClick={sortTable}>
      {column}
      {desOrder && <span> &darr;</span>}
      {ascOrder && <span> &uarr;</span>}
    </th>
  );
};

export default TableHeaderSort;
