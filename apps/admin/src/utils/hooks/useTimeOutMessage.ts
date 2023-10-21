import { useEffect, useState } from 'react';

function useTimeOutMessage(
	interval = 5000
): [message: string, setMessage: (message: string) => void] {
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (message) {
			let timeout = setTimeout(() => setMessage(''), interval);
			return () => {
				clearTimeout(timeout);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message]);

	return [message, setMessage];
}

export default useTimeOutMessage;
