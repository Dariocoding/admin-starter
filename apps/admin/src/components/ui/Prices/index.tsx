import React from 'react';
import classNames from 'classnames';
import { formatter } from '@/utils';

export interface PricesProps {
	className?: string;
	price?: number;
	contentClass?: string;
}

const Prices: React.FunctionComponent<PricesProps> = props => {
	const {
		className,
		price = 33,
		contentClass = 'py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium',
	} = props;

	return (
		<div className={className}>
			<div
				className={classNames(
					'flex items-center border-2 border-green-500 rounded-lg',
					contentClass
				)}
			>
				<span className="text-green-500 !leading-none">
					{formatter.format(price)}
				</span>
			</div>
		</div>
	);
};

export default Prices;
