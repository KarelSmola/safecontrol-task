import React, { useState, useEffect } from "react";
import generatedItems from "./data/data";
import IDlist from "./components/IDlist";
import InputSearch from "./components/InputSearch";
import TableHead from "./components/TableHead";

const App = () => {
  const [items, setItems] = useState(generatedItems);
  const [sorting, setSorting] = useState({ column: "title", order: "asc" });
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(items);

  const columns = ["id", "title", "description"];

  const selectRow = (selectedItem) => {
    const selectedRow = items.map((curItem) => {
      if (curItem.id === selectedItem.id) {
        return curItem.selected === false
          ? { ...selectedItem, selected: true }
          : { ...selectedItem, selected: false };
      } else {
        return curItem;
      }
    });

    setItems(selectedRow);
  };

  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };

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

  useEffect(() => {
    if (searchText.length) {
      const filterData = items.filter((item) =>
        item.title.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setFilteredData(filterData);
    } else {
      setFilteredData([]);
    }
  }, [searchText, items]);

  return (
    <>
      <IDlist ids={items} />
      <InputSearch searchText={searchText} onSearchText={setSearchText} />
      <table className="table">
        <TableHead
          columns={columns}
          sorting={sorting}
          onSortTable={sortTable}
        />
        <tbody>
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className="table-row"
              style={
                item.selected
                  ? { backgroundColor: item.color }
                  : { backgroundColor: "transparent" }
              }
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
    </>
  );
};

export default App;
