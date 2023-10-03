import React, { useState, useEffect, useMemo, useCallback } from "react";
import { generatedItems } from "./data/data";
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

  const selectColumn = (selectedColumn) => {
    console.log(selectedColumn);

    items.map((curItem) => {
      console.log(curItem);

      return {
        ...curItem,
        selectedColumn: { ...curItem[selectedColumn], selectedColumn: true },
      };
    });
  };
  console.log(items);

  const sortedAndFilteredItems = useMemo(() => {
    let sortableAndFilteredItems = [...items];

    if (sortConfig !== null) {
      sortableAndFilteredItems.sort((a, b) => {
        const { name: name_a } = a[sortConfig.column];
        const { name: name_b } = b[sortConfig.column];

        if (name_a < name_b) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (name_a > name_b) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    if (searchText.length) {
      sortableAndFilteredItems = items.filter((item) =>
        item.title.toLowerCase().startsWith(searchText.toLowerCase()),
      );
    }

    return sortableAndFilteredItems;
  }, [items, sortConfig, searchText]);

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

  return (
    <MainWrapper>
      <IDlist ids={items} />
      <InputSearch searchText={searchText} onSearchText={setSearchText} />
      <table className="table">
        <TableHead requestSorting={requestSort} sortConfig={sortConfig} />
        <tbody>
          {sortedAndFilteredItems.map((item) => (
            <tr
              key={item.id.name}
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
                <td
                  key={column}
                  className="table-cell"
                  onClick={() => {
                    selectColumn(column);
                  }}
                >
                  {item[column].name}
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
