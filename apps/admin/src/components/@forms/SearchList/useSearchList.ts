import React from "react";
import { ISearchListContainerProps } from "./SearchList";

export const useSearchList = (props: ISearchListContainerProps) => {
	const { results, selected, setSelected, onClickResult, refContainer } = props;
	const [refPanel, setRefPanel] = React.useState<HTMLDivElement>(null);
	const refSelected = React.useRef<HTMLDivElement>(null);

	const calcScrollElement = React.useCallback(() => {
		const elPanel = refPanel;
		const elPanelRect = elPanel.getBoundingClientRect();
		const elSelected = refSelected.current;
		const elSelectedRect = elSelected.getBoundingClientRect();
		const positionSelected = elSelectedRect.top - elPanelRect.top + elPanel.scrollTop - 100;

		elPanel.scrollTo({
			top: positionSelected,
			behavior: "smooth",
		});
	}, [selected, refPanel]);

	React.useEffect(() => {
		function changeSelect(e: KeyboardEvent) {
			if (results.length === 0) return;
			const eventKey = e.key;

			let valueIdx: number;

			if (eventKey === "ArrowUp" || eventKey === "ArrowDown") {
				valueIdx = results.map(result => result.value).indexOf(selected.value);
				if (valueIdx === -1) {
					setSelected(results[0]);
				}
			}

			if (eventKey === "ArrowUp") {
				const nextValue = results[valueIdx - 1];
				if (nextValue) {
					setSelected(nextValue);
					calcScrollElement();
				}
			} else if (eventKey === "ArrowDown") {
				const nextValue = results[valueIdx + 1];
				if (nextValue) {
					setSelected(nextValue);
					calcScrollElement();
				}
			}

			if (eventKey === "Enter") onClickResult(selected.value);
		}

		window.addEventListener("keydown", changeSelect);

		return () => {
			window.removeEventListener("keydown", changeSelect);
		};
	}, [results, calcScrollElement]);

	const controlPanelPosition = React.useCallback(() => {
		// calculate if the panel is out of the screen bottom and move it to the top
		// if there is space to show it move it to the bottom
		const container = refContainer.current;
		const panel = refPanel;
		if (container && panel) {
			const containerRect = container.getBoundingClientRect();
			const panelRect = panel.getBoundingClientRect();

			if (window.innerHeight > panelRect.bottom) {
				const style = `transform: translate3d(0px, 0px, 0) !important;`;
				panel.setAttribute("style", style);
			} else if (panelRect.bottom > window.innerHeight) {
				const topCorner = containerRect.height + panelRect.height;
				const style = `transform: translate3d(0px, -${topCorner + 10}px, 0) !important;`;
				panel.setAttribute("style", style);
			}
		}
	}, [refPanel]);

	React.useEffect(() => {
		controlPanelPosition();

		window.addEventListener("resize", controlPanelPosition);

		return () => {
			window.removeEventListener("resize", controlPanelPosition);
		};
	}, [controlPanelPosition]);

	return { refSelected, setRefPanel };
};
