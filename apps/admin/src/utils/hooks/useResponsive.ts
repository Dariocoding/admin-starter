import * as React from 'react';
import { breakpoints } from '@/utils';
interface WindowSize {
	width: number;
	height: number;
}

export type Breakpoint = keyof typeof breakpoints;

const useResponsive = () => {
	const [breakpoint, setBreakPoint] = React.useState<Breakpoint>();
	const [windowSize, setWindowSize] = React.useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	const handleResize = React.useCallback(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	React.useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();

		if (breakpoints.mobile < windowSize.width && windowSize.width < breakpoints.sm) {
			setBreakPoint('mobile');
		}

		if (breakpoints.sm < windowSize.width && windowSize.width < breakpoints.md) {
			setBreakPoint('md');
		}
		if (breakpoints.md < windowSize.width && windowSize.width < breakpoints.lg) {
			setBreakPoint('lg');
		}
		if (breakpoints.lg < windowSize.width && windowSize.width < breakpoints.xl) {
			setBreakPoint('xl');
		}
		if (breakpoints.xl < windowSize.width && windowSize.width < breakpoints['2xl']) {
			setBreakPoint('2xl');
		}

		if (windowSize.width >= breakpoints['2xl']) {
			setBreakPoint('2xl');
		}

		return () => window.removeEventListener('resize', handleResize);
	}, [windowSize.width, handleResize]);

	return {
		breakpoint,
		mobile: breakpoint === 'mobile' || breakpoint === 'sm',
		desktop:
			breakpoint === 'md' ||
			breakpoint === 'lg' ||
			breakpoint === '2xl' ||
			breakpoint === 'xl',
	};
};

export default useResponsive;
