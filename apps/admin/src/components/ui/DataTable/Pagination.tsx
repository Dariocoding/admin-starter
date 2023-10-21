import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface IPaginatedItemsProps {
  itemsPerPage: number;
  items: any[];
  setItemOffset(newValue: number): void;
  pageCount: number;
  page: number;
  setPage(value: number): void;
}

const PaginatedItems: React.FunctionComponent<IPaginatedItemsProps> = (props) => {
  const { itemsPerPage, items, setItemOffset, setPage } = props;

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  return (
    <ReactPaginate
      nextLabel={<FaAngleDoubleRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={props.pageCount}
      previousLabel={<FaAngleDoubleLeft />}
      renderOnZeroPageCount={null}
      pageClassName=""
      pageLinkClassName="btn btn-outline-primary btn-xs"
      previousClassName=""
      previousLinkClassName="btn btn-primary btn-xs px-2"
      nextClassName=""
      nextLinkClassName="btn btn-primary btn-xs px-2"
      breakLabel="..."
      breakClassName="btn btn-xs btn-outline-primary"
      breakLinkClassName=""
      containerClassName="flex justify-center items-center"
      activeClassName=""
      activeLinkClassName="btn btn-primary btn-xs"
      forcePage={props.page}
    />
  );
};

export default PaginatedItems;
