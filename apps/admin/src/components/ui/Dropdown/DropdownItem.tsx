import { Menu } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";

interface IDropdownItemProps {
	children?: React.ReactNode;
	className?: string;
	onClick?(): void;
	sm?: boolean;
	enableHoverClasses?: boolean;
	enablePaddings?: boolean;
}

const DropdownItem: React.FunctionComponent<IDropdownItemProps> = props => {
	const { className, onClick, sm, enableHoverClasses = true, enablePaddings = true } = props;

	const spanClassName = classNames(
		"block cursor-pointer text-gray-700",
		sm ? "text-xs" : "text-sm",
		enablePaddings && "px-3 py-2 pr-4",
		enableHoverClasses && "hover:bg-gray-100 hover:text-gray-900",
		className
	);

	return (
		<Menu.Item>
			<span className={spanClassName} onClick={onClick}>
				{props.children}
			</span>
		</Menu.Item>
	);
};

export default DropdownItem;
