import * as React from 'react';

interface ILabelProps {
	children?: React.ReactNode;
	htmlFor?: string;
	className?: string;
	required?: boolean;
}

const Label: React.FunctionComponent<ILabelProps> = props => {
	const { htmlFor, children, className, required } = props;
	if (!children) return null;
	return (
		<label htmlFor={htmlFor} className={className}>
			{children}
		</label>
	);
};

export default Label;
