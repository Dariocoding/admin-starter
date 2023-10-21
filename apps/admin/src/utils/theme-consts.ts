export const SIDE_NAV_WIDTH = 250;
export const SIDE_NAV_COLLAPSED_WIDTH = 80;
export const SIDE_NAV_CONTENT_GUTTER = 'px-4';
export const LOGO_X_GUTTER = 'px-6';
export const IS_THEMED = true;

/* THEME WITH SLATE */

export const THEMED_SIDEBAR_CLASSNAMES = {
	topLogoContainer: 'bg-slate-900 border-slate-800 border-t-0',
	headerTop: 'bg-slate-800',
	textColor: 'text-[#fbfbfb]',
	textSubtitleSidebar: 'text-gray-50',
	hoverNavToggle: 'hover:bg-slate-700',
	sidebarContainer: 'bg-slate-800 border-0',
	sidebarItemHover: 'hover:bg-slate-700',
	sidebarItemDropdown: 'hover:bg-slate-500',
	sidebarDropdownCollapsedContainer: 'bg-slate-700',
	loaderColor: 'text-slate-700',
};

/* THEME WITH INDIGO */

/* export const THEMED_SIDEBAR_CLASSNAMES = {
	topLogoContainer: 'bg-indigo-700 border-indigo-600 border-t-0',
	headerTop: 'bg-indigo-600',
	textColor: 'text-[#fbfbfb]',
	textSubtitleSidebar: 'text-gray-50',
	hoverNavToggle: 'hover:bg-indigo-700',
	sidebarContainer: 'bg-indigo-600 border-0',
	sidebarItemHover: 'hover:bg-indigo-700',
	sidebarItemDropdown: 'hover:bg-indigo-500',
	sidebarDropdownCollapsedContainer: 'bg-indigo-700',
	loaderColor: 'text-indigo-700',
}; */

/* THEME WITH PURPLE */

/* export const THEMED_SIDEBAR_CLASSNAMES = {
	topLogoContainer: 'bg-purple-700 border-purple-600 border-t-0',
	headerTop: 'bg-purple-600',
	textColor: 'text-[#fbfbfb]',
	textSubtitleSidebar: 'text-gray-50',
	hoverNavToggle: 'hover:bg-purple-700',
	sidebarContainer: 'bg-purple-600 border-0',
	sidebarItemHover: 'hover:bg-purple-700',
	sidebarItemDropdown: 'hover:bg-purple-500',
	sidebarDropdownCollapsedContainer: 'bg-purple-700',
	loaderColor: 'text-purple-700',
}; */

/* THEME WITH BLUE */

/* export const THEMED_SIDEBAR_CLASSNAMES = {
	topLogoContainer: 'bg-blue-700 border-blue-600 border-t-0',
	headerTop: 'bg-blue-600',
	textColor: 'text-[#fbfbfb]',
	textSubtitleSidebar: 'text-gray-50',
	hoverNavToggle: 'hover:bg-blue-700',
	sidebarContainer: 'bg-blue-600 border-0',
	sidebarItemHover: 'hover:bg-blue-700',
	sidebarItemDropdown: 'hover:bg-blue-500',
	sidebarDropdownCollapsedContainer: 'bg-blue-700',
	loaderColor: 'text-blue-700',
}; */

/* THEME WITH TEAL */

/* export const THEMED_SIDEBAR_CLASSNAMES = {
	topLogoContainer: 'bg-teal-800 border-teal-600 border-t-0',
	headerTop: 'bg-teal-600',
	textColor: 'text-[#fbfbfb]',
	textSubtitleSidebar: 'text-gray-50',
	hoverNavToggle: 'hover:bg-teal-700',
	sidebarContainer: 'bg-teal-700 border-0',
	sidebarItemHover: 'hover:bg-teal-600',
	sidebarItemDropdown: 'hover:bg-teal-500',
	sidebarDropdownCollapsedContainer: 'bg-teal-600',
	loaderColor: 'text-teal-700',
}; */

export const colorsCromatics = [
	'slate',
	'gray',
	'zinc',
	'neutral',
	'stone',
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose',
];

const colorsNumbers = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

export const tailwindColors = [
	...colorsNumbers
		.map(number => {
			const colorsNormal = colorsCromatics.map(color => {
				return `bg-${color}-${number}`;
			});

			const colorsHover = colorsCromatics.map(color => {
				return `hover:${color}-${number}`;
			});

			const borderColors = colorsCromatics.map(color => {
				return `border-${color}-${number}`;
			});

			const textColors = colorsCromatics.map(color => {
				return `text-${color}-${number}`;
			});

			const borders = ['border', 'border-t', 'border-r', 'border-b', 'border-l'];

			return [
				...colorsNormal,
				...colorsHover,
				...borderColors,
				...borders,
				...textColors,
			];
		})
		.flat(),
];
