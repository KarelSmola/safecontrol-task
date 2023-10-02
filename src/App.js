import React, { useState, useEffect, useMemo } from "react";
import generatedItems from "./data/data";
import { MainWrapper } from "./components/UI/MainWrapper";
import { IDlist } from "./components/IDlist";
import { InputSearch } from "./components/InputSearch";
import { TableHead } from "./components/TableHead";

const columns = ["id", "title", "description"];

const App = () => {
  const [items, setItems] = useState(generatedItems);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

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

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.column] < b[sortConfig.column]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.column] > b[sortConfig.column]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (column) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.column === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ direction, column });
  };

  useEffect(() => {
    if (searchText.length) {
      let filterData = sortedItems.filter((item) => {
        return item.title.toLowerCase().startsWith(searchText.toLowerCase());
      });
      setItems(filterData);
    } else {
      setItems(generatedItems);
    }
  }, [searchText, sortedItems]);

  return (
    <MainWrapper>
      <IDlist ids={items} />
      <InputSearch searchText={searchText} onSearchText={setSearchText} />
      <table className="table">
        <TableHead requestSorting={requestSort} sortConfig={sortConfig} />
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
    </MainWrapper>
  );
};

export default App;
