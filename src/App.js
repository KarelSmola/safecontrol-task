import React, { useState, useEffect } from "react";
import generatedItems from "./data/data";
import MainWrapper from "./components/UI/MainWrapper";
import IDlist from "./components/IDlist";
import InputSearch from "./components/InputSearch";
import TableHead from "./components/TableHead";

const columns = ["id", "title", "description"];

const App = () => {
  const [items, setItems] = useState(generatedItems);
  const [sorting, setSorting] = useState({ column: "title", order: "asc" });
  const [searchText, setSearchText] = useState("");

  const selectRow = (selectedItem) => {
    const selectedRow = items.map((curItem) => {
      console.log(selectedItem.id);
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

  let sortedItems = null;

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
      setItems(filterData);
    } else {
      setItems(generatedItems);
    }
  }, [searchText, items]);

  return (
    <MainWrapper>
      <IDlist ids={items} />
      <InputSearch searchText={searchText} onSearchText={setSearchText} />
      <table className="table">
        <TableHead
          columns={columns}
          sorting={sorting}
          onSortTable={sortTable}
        />
        <tbody>
          {sortedItems
            ? sortedItems.map((sortedItem) => (
                <tr
                  key={sortedItem.id}
                  className="table-row"
                  style={
                    sortedItem.selected
                      ? { backgroundColor: sortedItem.color }
                      : { backgroundColor: "transparent" }
                  }
                  onClick={() => {
                    selectRow(sortedItem);
                  }}
                >
                  {columns.map((column) => (
                    <td key={column} className="table-cell">
                      {sortedItem[column]}
                    </td>
                  ))}
                </tr>
              ))
            : items.map((item) => (
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
    </MainWrapper>
  );
};

export default App;
