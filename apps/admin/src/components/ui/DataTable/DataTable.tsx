import classNames from "classnames";
import { getIn } from "formik";
import * as React from "react";
import RenderIf from "../RenderIf";
import { HeaderDataTable } from "./interfaces";
import PaginatedItems from "./Pagination";
import SearchDataTable from "./Search";
import { useMedia } from "../hooks";

interface IDataTableProps<T> {
  heading: HeaderDataTable[];
  data: T[];
  loading?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  buttons?: React.ReactNode;
  placeholder: React.ReactNode;
  showResponsive?: boolean;
  showAll?: boolean;
  onChangePage?(): void;
  render?(data: T[]): any[];
  itemsPerPage?: number;
}

function DataTable<T = any>(props: React.PropsWithChildren<IDataTableProps<T>>) {
  const {
    data,
    loading,
    showPagination = true,
    heading,
    showResponsive = true,
    showAll = false,
    onChangePage,
    render,
    itemsPerPage = 10,
  } = props;
  const md = useMedia("(max-width: 768px)");
  const [q, setQ] = React.useState("");
  const [currentItems, setCurrentItems] = React.useState(data);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const render = () => {
      if (showAll) {
        setCurrentItems(data);
        return;
      }
      const endOffset = itemOffset + itemsPerPage;
      const newData = search(data);
      const pageCount = Math.ceil(newData.length / itemsPerPage);
      const currentItems = newData.slice(itemOffset, endOffset);
      const actualPage = pageCount ? page + 1 : 0;
      setCurrentItems(currentItems);
      setPageCount(pageCount);
      if (actualPage > pageCount) {
        const newOffset = ((pageCount - 1) * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        setPage(pageCount - 1);
      }
    };

    render();

    // eslint-disable-next-line
  }, [itemOffset, data, q, showAll]);

  React.useEffect(() => {
    onChangePage?.();
  }, [itemOffset]);

  function search(rows: any[]) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          getIn(row, column)?.toString()?.toLowerCase()?.indexOf(q.toLowerCase().trim()) > -1
      )
    );
  }

  const currentItemRendered = React.useMemo(
    () => (render ? render(currentItems) : currentItems),
    [currentItems, render]
  );

  return (
    <div>
      <SearchDataTable q={q} setQ={setQ} {...props} />
      <RenderIf isTrue={loading}>{props.placeholder}</RenderIf>
      <RenderIf isTrue={!loading && !md}>
        <div className={classNames(showResponsive ? "table-responsive" : "overflow-x-auto")}>
          <table className="table">
            <thead>
              <tr>
                {heading.map((h) => (
                  <Th key={h.field} heading={h} currentItems={currentItemRendered} />
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItemRendered.map((item, key) => (
                <tr key={key}>
                  {heading.map((h, key) => (
                    <td key={key} className={classNames(h.center && "text-center")}>
                      {getIn(item, h.field)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RenderIf>
      <RenderIf isTrue={!loading && md}>
        <div>
          {currentItemRendered.map((item, key) => (
            <span key={key}>
              {heading.map((h, key) => (
                <div key={key} className="py-1 my-1">
                  <span className="font-bold text-xs">
                    {typeof h.title === "function"
                      ? h.title({ currentItems: currentItemRendered })
                      : h.title}
                    :
                  </span>{" "}
                  <span className="text-xs">{getIn(item, h.field)}</span>
                </div>
              ))}
              <hr />
            </span>
          ))}
        </div>
      </RenderIf>
      <RenderIf isTrue={!loading && showPagination && !showAll}>
        <div className="flex lg:justify-between justify-center lg:flex-row flex-col mt-4">
          <small className="lg:mb-0 mb-2 lg:inline block text-center">
            <span className="font-bold">Total Records:</span> {Object.keys(data).length}
          </small>
          <PaginatedItems
            pageCount={pageCount}
            setItemOffset={setItemOffset}
            items={data}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        </div>
      </RenderIf>
    </div>
  );
}

export default DataTable;

const Th: React.FunctionComponent<{ heading: HeaderDataTable; currentItems: any[] }> = (props) => {
  const { heading: h, currentItems } = props;
  return (
    <th className={classNames(h.center && "text-center")}>
      {typeof h.title === "function" ? h.title({ currentItems }) : h.title}
    </th>
  );
};
