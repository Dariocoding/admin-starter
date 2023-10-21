import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

export interface ICardProps {
  icon: IconType;
  title: () => string;
  to?: string;
  description?: () => string;
  className?: string;
  btnLinkText: string;
  classNameButton?: string;
  onClick?(): void;
}

const Card: React.FunctionComponent<ICardProps> = (props): JSX.Element => {
  const {
    icon: Icon,
    title,
    description,
    to,
    className,
    btnLinkText,
    classNameButton,
    onClick,
  } = props;
  return (
    <div className="bg-white shadow text-center rounded-md">
      <div
        className={classNames(
          "overflow-hidden p-[30px] rounded-t-md flex items-center justify-center",
          className
        )}
      >
        <Icon className="text-white" size={70} />
      </div>
      <div className="text-light p-4">
        <h6 className="text-dark mb-1 font-semibold">{title()}</h6>
        <RenderIf isTrue={description}>
          <p className="text-dark mb-4 text-sm">{description()}</p>
        </RenderIf>
        <RenderIf isTrue={!onClick}>
          <Link to={to} className={classNames("btn btn-sm border-0", classNameButton)}>
            {btnLinkText}
          </Link>
        </RenderIf>
        <RenderIf isTrue={onClick}>
          <button
            type="button"
            className={classNames("btn btn-sm border-0", classNameButton)}
            onClick={onClick}
          >
            {btnLinkText}
          </button>
        </RenderIf>
      </div>
    </div>
  );
};

export default Card;
