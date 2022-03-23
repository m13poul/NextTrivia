import {
    MdChevronRight,
    MdChevronLeft,
    MdLastPage,
    MdFirstPage,
  } from "react-icons/md";
import { IconContext } from "react-icons";

function Pagination({canPreviousPage, canNextPage, pageIndex, pageOptions, pageSize, setPageSize, nextPage, previousPage, gotoPage, pageCount}) {
  return (
    <div>
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
              {pageIndex + 1} of {pageOptions.length}{""}
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
      </div>
    </div>
  )
}

export default Pagination