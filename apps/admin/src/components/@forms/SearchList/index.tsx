import * as React from "react";
import "./SearchList.css";
import SearchListContainer from "./SearchList";
import RenderIf from "@/components/ui/RenderIf";

export interface ISearchResult {
  value: string | number;
  label: string;
}

export interface ISearchListProps {
  results: ISearchResult[];
  classNameContainer?: string;
  onClickResult?: (value: string | number) => void;
  selected?: ISearchResult;
  setSelected?: React.Dispatch<ISearchResult>;
  children?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  focused?: boolean;
}

const SearchList: React.FunctionComponent<ISearchListProps> = (props) => {
  const { onFocus, onBlur, focused } = props;

  const refContainer = React.useRef<HTMLDivElement>();

  return (
    <div
      className="container-input-code relative"
      onBlur={onBlur}
      onFocus={onFocus}
      ref={refContainer}
    >
      {props.children}
      <RenderIf isTrue={focused}>
        <SearchListContainer {...props} refContainer={refContainer} />
      </RenderIf>
    </div>
  );
};

export default SearchList;
