import React, { FunctionComponent } from "react";
import { FaSearch } from "react-icons/fa";
import RenderIf from "../RenderIf";

interface ISearchDataTableProps {
  setQ(value: string): void;
  q: string;
  showSearch?: boolean;
  buttons?: React.ReactNode;
  showAll?: boolean;
}

const SearchDataTable: FunctionComponent<ISearchDataTableProps> = (props) => {
  const { setQ, q, showSearch = true, buttons, showAll } = props;
  return (
    <RenderIf isTrue={showSearch || buttons}>
      <div className="flex lg:justify-between lg:items-center justify-center lg:flex-row flex-col text-center mb-4">
        <div className="w-full">{buttons}</div>

        <RenderIf isTrue={showSearch}>
          <div className="relative">
            <input
              type="text"
              className="form-control pr-7 form-control-sm"
              placeholder="Search..."
              autoComplete="off"
              value={q}
              disabled={showAll}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="absolute right-2.5 top-2.5 text-sm">
              <FaSearch />
            </span>
          </div>
        </RenderIf>
      </div>
    </RenderIf>
  );
};

export default SearchDataTable;
