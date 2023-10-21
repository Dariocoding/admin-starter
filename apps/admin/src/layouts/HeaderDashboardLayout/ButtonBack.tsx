import RenderIf from "@/components/ui/RenderIf";
import * as React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

interface IButtonBackProps {
  to: string;
}

const ButtonBack: React.FunctionComponent<IButtonBackProps> = (props) => {
  const { to } = props;
  return (
    <RenderIf isTrue={to}>
      <Link
        to={to}
        className="btn btn-xs btn-dark mb-0 text-xs px-2 py-1.5 hover:animate-bounce-left"
      >
        <FaChevronLeft className="mr-0.5 text-xs" />
      </Link>
    </RenderIf>
  );
};

export default ButtonBack;
