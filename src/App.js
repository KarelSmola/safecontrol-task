import React, { useState } from "react";
import generatedItems from "./data/data";
import TableHead from "./components/TableHead";

const App = () => {
  const [items, setItems] = useState(generatedItems);

  const columns = ["id", "title", "description"];

  const selectRow = (item) => {
    console.log(item);
  };

  return (
    <table className="table">
      <TableHead columns={columns} />
      <tbody>
        {items.map((item) => (
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
