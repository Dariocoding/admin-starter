import * as React from 'react';

const useFirstLoad = () => {
	const firstUpdate = React.useRef(true);
	React.useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
	});

	return firstUpdate.current;
};

export default useFirstLoad;
