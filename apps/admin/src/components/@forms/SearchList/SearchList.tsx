import * as React from "react";
import { RenderIf } from "react-rainbow-components";
import { ISearchListProps } from ".";
import classNames from "classnames";
import SearchResult from "./SearchResult";
import { useSearchList } from "./useSearchList";

export interface ISearchListContainerProps extends ISearchListProps {
	refContainer: React.MutableRefObject<HTMLDivElement>;
}

const SearchListContainer: React.FunctionComponent<ISearchListContainerProps> = props => {
	const { results, classNameContainer, selected, onClickResult } = props;
	const { refSelected, setRefPanel } = useSearchList({ ...props });

	return (
		<RenderIf isTrue={results.length}>
			<div className={classNames("absolute z-50 w-full", classNameContainer)}>
				<div className="results-list" ref={setRefPanel}>
					{results.map((result, id) => (
						<SearchResult
							result={result}
							key={id}
							onClickResult={onClickResult}
							selected={selected?.value === result.value}
							refSelected={refSelected}
						/>
					))}
				</div>
			</div>
		</RenderIf>
	);
};

export default SearchListContainer;
