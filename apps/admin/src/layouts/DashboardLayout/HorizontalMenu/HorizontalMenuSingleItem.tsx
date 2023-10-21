import * as React from 'react';
import { IMenuItem } from '../data/data-menu';
import HorizontalMenuSpan from './HorizontalMenuSpan';
import { Link, useNavigate } from 'react-router-dom';

interface IHorizontalMenuSingleItemProps {
	item: IMenuItem;
	idx?: number;
}

const HorizontalMenuSingleItem: React.FC<IHorizontalMenuSingleItemProps> = props => {
	const { item } = props;
	const navigate = useNavigate();
	const handleClick = () => navigate(item.path);
	return <HorizontalMenuSpan item={item} onClick={handleClick} idx={props.idx} />;
};

export default HorizontalMenuSingleItem;
