import { useEffect, useRef } from 'react';

/**
 * Hook that handles outside click event of the passed refs
 *
 * @param handler a handler function to be called when clicked outside
 */
export default function useOutsideClick<T = HTMLElement>(handler?: () => void) {
	const ref = useRef<T>();
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (!handler) return;

			// Clicked browser's scrollbar
			if (
				event.target === document.getElementsByTagName('html')[0] &&
				event.clientX >= document.documentElement.offsetWidth
			)
				return;

			let containedToAnyRefs = false;
			// @ts-ignore
			if (ref && ref.current && ref.current?.contains?.(event.target)) {
				containedToAnyRefs = true;
			}

			// Not contained to any given refs
			if (!containedToAnyRefs) {
				handler();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handler]);

	return ref;
}
