/* eslint-disable react/jsx-key */
import { useTable } from "react-table";
import { COLUMNS } from "./COLUMNS";
import { useMemo,  useEffect } from "react";
const { v4: uuidv4 } = require("uuid");

export const Table = ({games}) => {
  console.log(games)

  useEffect(() => {
      
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const gamesData = useMemo(() => games, []);

  const tableInstance = useTable({
    columns,
    data: gamesData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
      //https://flowbite.com/docs/components/tables/
    <div>
      <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps} key={uuidv4()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps} className="px-6 py-3" key={uuidv4()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-200" key={uuidv4()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps} className="px-6 py-4" key={uuidv4()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
            
    </div>
  );
};
