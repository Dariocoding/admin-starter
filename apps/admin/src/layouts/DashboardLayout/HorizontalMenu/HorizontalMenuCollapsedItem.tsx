import * as React from "react";
import { IMenuItem, SubNavItem } from "../data/data-menu";
import HorizontalMenuSpan from "./HorizontalMenuSpan";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/Dropdown/DropdownItem";
import { useNavigate } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import AuthorityCheck from "@/components/AuthorityCheck";

interface IHorizontalMenuCollapsedItemProps {
  item: IMenuItem;
  idx?: number;
}

const HorizontalMenuCollapsedItem: React.FC<IHorizontalMenuCollapsedItemProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <Dropdown
      isRelativeContainer={false}
      displayButton={
        <HorizontalMenuSpan
          onClick={() => item.path && navigate(item.path)}
          item={item}
          idx={props.idx}
        />
      }
    >
      {item.subNav.map((item, idx) => (
        <AuthorityCheck validRoles={item.permissions} key={idx}>
          <CollpasedItem item={item} key={idx} />
        </AuthorityCheck>
      ))}
    </Dropdown>
  );
};

interface ICollpasedItemProps {
  item: SubNavItem;
}

const CollpasedItem: React.FunctionComponent<ICollpasedItemProps> = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleClick = () => navigate(item.path);
  return (
    <DropdownItem onClick={handleClick}>
      <span className="flex items-center">
        <span>
          <FaCircleNotch className="mr-1.5 text-xs" />
        </span>

        <span>{item.title()}</span>
      </span>
    </DropdownItem>
  );
};

export default HorizontalMenuCollapsedItem;
