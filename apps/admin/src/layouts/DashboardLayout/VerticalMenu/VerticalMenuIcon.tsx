import classNames from 'classnames';
import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export interface IVerticalMenuIconProps {
	children?: React.ReactNode;
	gutter?: boolean;
	sm?: boolean;
}

const VerticalMenuIcon: React.FunctionComponent<IVerticalMenuIconProps> = props => {
	const { gutter = true, children, sm } = props;
	const isCollapsed = useDashboardStore(state => state.isCollapsed);
	return (
		<span
			className={classNames(
				!sm && isCollapsed ? 'text-sm' : 'text-xl',
				gutter && 'mr-1.5',
				sm && 'text-xs'
			)}
		>
			{children}
		</span>
	);
};

export default VerticalMenuIcon;
