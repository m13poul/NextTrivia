/* eslint-disable react/jsx-key */

import {
  MdChevronRight,
  MdChevronLeft,
  MdLastPage,
  MdFirstPage,
} from "react-icons/md";
import { IconContext } from "react-icons";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./COLUMNS";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export const Table = ({ games }) => {
  const gamesData = useMemo(() => games, []);
  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: gamesData,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  // console.log(games);

  return (
    <div className="md:col-span-3 lg:col-span-5">
      <h2 className=" text-3xl  font-title text-orange-500 mb-4 bg-[#420039] rounded-md">Past Games</h2>
      {/* https://flowbite.com/docs/components/tables/ */}
      <div>
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500  border-collapse"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps} key={uuidv4()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps}
                    className="px-6 py-3"
                    key={uuidv4()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps}
                  className="bg-white border-b  hover:bg-gray-200"
                  key={uuidv4()}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4"
                      key={uuidv4()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps} key={uuidv4()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps}
                    className="px-6 py-3"
                    key={uuidv4()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
        <div className="pagination">
          <div className="flex justify-center mt-4 items-center">
            <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
              <MdFirstPage
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              />
              <MdChevronLeft
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              />
              <MdChevronRight
                onClick={() => nextPage()}
                disabled={!canNextPage}
              />
              <MdLastPage
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              />
            </IconContext.Provider>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
                {""}
              </strong>{" "}
            </span>{" "}
            <span>
              &nbsp;| Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
                className=" border-none text-center focus:ring-0"
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className=" border-none focus:ring-0"
            >
              {[5, 10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
