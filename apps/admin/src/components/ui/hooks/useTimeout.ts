import React from 'react';

interface UseTimeOutProps {
	fn: () => void;
	ms: number;
	open: boolean;
}

function useTimeout(props: UseTimeOutProps) {
	const { fn, ms = 0, open = true } = props;
	const timeout = React.useRef<NodeJS.Timeout>();

	const clear = React.useCallback(() => {
		timeout.current && clearTimeout(timeout.current);
	}, []);

	const set = React.useCallback(() => {
		if (open) timeout.current = setTimeout(() => fn?.(), ms);
	}, [ms, fn, open]);

	React.useEffect(() => {
		set();
		return clear;
	}, [fn, ms, open, clear, set]);

	return { clear, reset: set };
}

export default useTimeout;
