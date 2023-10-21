import React, { useId } from "react";
import { PlacesType, Tooltip as ReactTooltip } from "react-tooltip";
import classNames from "classnames";
import "react-tooltip/dist/react-tooltip.css";
import RenderIf from "../RenderIf";

interface Props extends React.HTMLProps<HTMLSpanElement> {
  children?: React.ReactNode;
  message?: string;
  placement?: PlacesType;
  className?: string;
  onClick?(): void;
  sm?: boolean;
  classNameTooltip?: string;
}

const ToolTip: React.FunctionComponent<Props> = (props) => {
  const {
    children,
    message,
    placement = "top",
    className,
    onClick,
    sm = false,
    classNameTooltip,
    ...restProps
  } = props;
  const [tooltip, showTooltip] = React.useState(true);
  const id = useId();

  return (
    <React.Fragment>
      <span
        id={id}
        className={classNames("inline-block", className)}
        onClick={onClick}
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 50);
        }}
        {...restProps}
      >
        {children}
      </span>

      <RenderIf isTrue={tooltip}>
        <ReactTooltip
          anchorId={id}
          place={placement}
          content={message}
          className={classNames(sm && "text-xs", classNameTooltip)}
        />
      </RenderIf>
    </React.Fragment>
  );
};

export default ToolTip;
