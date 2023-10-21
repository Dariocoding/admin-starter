import React from 'react';
import classNames from 'classnames';
import { APP_NAME, PF } from '@/utils';

const LOGO_SRC_PATH = PF + '/logo_enterprise';

export interface ILogoProps {
	mode?: 'light' | 'dark';
	type?: 'full' | 'streamline';
	gutter?: string;
	imgClass?: string;
	logoWidth?: string | number;
	style?: React.CSSProperties;
	className?: string;
	logoHeight?: string | number;
}
const Logo: React.FunctionComponent<ILogoProps> = props => {
	const {
		type = 'full',
		mode = 'light',
		gutter,
		className,
		imgClass,
		style,
		logoWidth = 'auto',
		logoHeight = '34px',
	} = props;

	return (
		<div
			className={classNames('logo', className, gutter)}
			style={{
				...style,
			}}
		>
			<img
				className={imgClass}
				src={`${LOGO_SRC_PATH}/${mode}/${type}`}
				alt={`${APP_NAME} logo`}
				style={{
					...{ width: logoWidth },
					...{ height: logoHeight, objectFit: 'cover' },
				}}
			/>
		</div>
	);
};

export default Logo;
