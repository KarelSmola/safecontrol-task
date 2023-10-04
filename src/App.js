import React, { useState,  useMemo, useCallback } from "react";
import { generatedItems, colorIdentsMap } from "./data/data";
import { MainWrapper } from "./components/UI/MainWrapper";
import { IDlist } from "./components/IDlist";
import { InputSearch } from "./components/InputSearch";
import { TableHead } from "./components/TableHead";

// type SelecteCells = Record<string, Record<string, boolean>>

const items = generatedItems

const columns = ["id", "title", "description"];

export const App = () => {
  //const [items, setItems] = useState(generatedItems);
  const [selectedIdentsMap, setSelectedIdentsMap] = useState(colorIdentsMap)
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  // const selectRow = (selectedItem) => {
  //   const selectedRow = items.map((curItem) => {
  //     if (curItem.id === selectedItem.id) {
  //       return curItem.selected === false
  //         ? { ...selectedItem, selected: true }
  //         : { ...selectedItem, selected: false };
  //     } else {
  //       return curItem;
  //     }
  //   });
  //
  //   setItems(selectedRow);
  // };

  const selectedIdsToShow = useMemo(()=>{
    return Object.keys(selectedCells).join(', ')
  }, [selectedCells])

  const changeIdentsMap = useCallback((identMapNumber)=>()=>{
    if(identMapNumber === '2'){
      // TODO - set colorIdentsMap2
      // setSelectedIdentsMap(colorIdentsMap2)
    }
    else {
      // setSelectedIdentsMap(colorIdentsMap1)
    }
  }, [])

  const selectCell = useCallback((id, columnIdent) => () =>{
    setSelectedCells(state=>{
      if(!state[id]){
        state[id] = {}
      }

      state[id][columnIdent] = !state[id][columnIdent]
    })
  }, [])

  // const selectColumn = (selectedColumn) => {
  //   console.log(selectedColumn);
  //
  //   items.map((curItem) => {
  //     console.log(curItem);
  //
  //     return {
  //       ...curItem,
  //       selectedColumn: { ...curItem[selectedColumn], selectedColumn: true },
  //     };
  //   });
  // };
  console.log(items);

  const sortedAndFilteredItems = useMemo(() => {
    let sortableAndFilteredItems = [...items];

    if (sortConfig !== null) {
      if (searchText.length) {
        sortableAndFilteredItems = items.filter((item) => {
          // const values = []
          let ret = false

          columns.forEach(columnIdent=>{
            // values.push(item[columnIdent])
            if(item[columnIdent].toLowerCase().trim().indexOf(searchText.toLowerCase()) > -1){
              ret = true
              return
            }
          })

          // const strToSearch = values.join(' ').toLowerCase().trim()

          // return strToSearch.indexOf(searchText.toLowerCase()) > -1



          return ret
          //return item.title.toLowerCase().startsWith(searchText.toLowerCase())
        });
      }

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



    return sortableAndFilteredItems;
  }, [items, sortConfig, searchText]);

  const requestSort = useCallback((column) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.column === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ direction, column });
  }, [])

  return (
    <MainWrapper>
      <IDlist ids={items} />

      <div>{selectedIdsToShow}</div>

      <InputSearch searchText={searchText} onSearchText={setSearchText} />
      <div>
        <button onClick={changeIdentsMap('1')}>Idents map 1</button>
        <button onClick={changeIdentsMap('2')}>Idents map 2</button>
      </div>
      <table className="table">
        <TableHead requestSorting={requestSort} sortConfig={sortConfig} />
        <tbody>
          {sortedAndFilteredItems.map((item) => (
            <tr
              key={item.id.name}
              className="table-row"
            >
              {columns.map((column) => (
                <td
                  key={column}
                  className="table-cell"
                  onClick={selectCell(item.id, column)}
                  style={{backgroundColor: selectedCells[item.id]?.[column]?selectedIdentsMap[item.ident]:'transparent'}}
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
