import * as React from "react";
import { ISearchResult } from ".";
import classNames from "classnames";

interface ISearchResultProps {
	result: ISearchResult;
	onClickResult: (value: string | number) => void;
	selected?: boolean;
	refSelected: React.MutableRefObject<HTMLDivElement>;
}

const SearchResult: React.FunctionComponent<ISearchResultProps> = props => {
	const { result, onClickResult, selected, refSelected } = props;

	return (
		<div
			className={classNames(
				"search-result text-sm cursor-pointer transition whitespace-normal",
				selected && "bg-gray-100"
			)}
			onClick={e => onClickResult(result.value)}
			ref={selected ? refSelected : null}
		>
			{result.label}
		</div>
	);
};

export default SearchResult;
