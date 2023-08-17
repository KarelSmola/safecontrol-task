import React, { useState } from "react";
import generatedItems from "./data/data";
import TableHead from "./components/TableHead";

const App = () => {
  const [items, setItems] = useState(generatedItems);
  const [sorting, setSorting] = useState({ column: "title", order: "asc" });

  const columns = ["id", "title", "description"];

  const selectRow = (item) => {
    console.log(item);
  };

  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };
  console.log(sorting);
  let sortedItems;

  if (sorting.column === "title" && sorting.order === "asc")
    sortedItems = items
      .slice()
      .sort((item1, item2) => item1.title.localeCompare(item2.title));

  if (sorting.column === "title" && sorting.order === "des")
    sortedItems = items
      .slice()
      .sort((item1, item2) => item2.title.localeCompare(item1.title));

  if (sorting.column === "description" && sorting.order === "asc")
    sortedItems = items
      .slice()
      .sort((item1, item2) =>
        item1.description.localeCompare(item2.description)
      );

  if (sorting.column === "description" && sorting.order === "des")
    sortedItems = items
      .slice()
      .sort((item1, item2) =>
        item2.description.localeCompare(item1.description)
      );

  if (sorting.column === "id" && sorting.order === "asc")
    sortedItems = items
      .slice()
      .sort((item1, item2) => item1.id.localeCompare(item2.id));

  if (sorting.column === "id" && sorting.order === "des")
    sortedItems = items
      .slice()
      .sort((item1, item2) => item2.id.localeCompare(item1.id));

  return (
    <table className="table">
      <TableHead columns={columns} sorting={sorting} onSortTable={sortTable} />
      <tbody>
        {sortedItems.map((item) => (
          <tr
            key={item.id}
            className="table-row"
            onClick={() => {
              selectRow(item);
            }}
          >
            {columns.map((column) => (
              <td key={column} className="table-cell">
                {item[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
