import React from "react";
import { HiX } from "react-icons/hi";

interface ICloseButtonProps {
  className?: string;
  onClick?: () => void;
}

const CloseButton: React.FunctionComponent<ICloseButtonProps> = (props) => {
  const { className, onClick } = props;

  return (
    <span onClick={onClick} className={className} role="button">
      <HiX />
    </span>
  );
};

export default CloseButton;
