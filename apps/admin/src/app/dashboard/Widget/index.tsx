import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";
import * as React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IWidgetDashboardProps {
  path: string;
  Icon: IconType;
  colouredIcon: string;
  title: string;
  value: number | string;
  backgroundIcon?: string;
}

const WidgetDashboard: React.FunctionComponent<IWidgetDashboardProps> = (props) => {
  const { path, Icon, colouredIcon, title, value, backgroundIcon } = props;
  return (
    <Link to={path}>
      <SpanCard className="flex items-start w-full relative mb-4 group">
        <StatusIcon
          className={classNames(
            "h-auto rounded-l-[6px] px-6 text-white self-stretch backdrop-filter backdrop-blur-lg bg-opacity-75 group-hover:bg-opacity-90 transition",
            backgroundIcon
          )}
        >
          <Icon />
        </StatusIcon>
        <StatusCard
          backgroundhovercolor={colouredIcon}
          className="rounded-r-[6px] px-4 py-6 w-full h-full toScale transform-gpu group-hover:text-white"
        >
          <StatusInfo colortext={props.colouredIcon}>
            <RenderIf isTrue={title}>
              <span className="text-2xl group-hover:text-white">{value}</span>
            </RenderIf>

            <RenderIf isTrue={value || value === 0}>
              <h6 className="mt-2 text-sm font-normal">{title}</h6>
            </RenderIf>
          </StatusInfo>
        </StatusCard>
      </SpanCard>
    </Link>
  );
};

export default WidgetDashboard;

const SpanCard = styled.span`
  &:hover .toScale:before {
    transform: scale(3);
  }
`;

const StatusCard = styled.div<{ backgroundhovercolor: string }>`
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.5s ease 0s;

  &::before {
    content: "";
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background-image: linear-gradient(
      to top right,
      #ffffff,
      ${(props) => props.backgroundhovercolor}
    );
    position: absolute;
    left: -50%;
    top: 0;
    transform: scale(0);
    transition: transform 0.8s ease 0s;
  }

  svg {
    color: ${(props) => props.backgroundhovercolor};
  }
`;

const StatusIcon = styled.div`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const StatusInfo = styled.div<{ colortext: string }>`
  flex-grow: 1;
  text-align: center;
  z-index: 1;
  text-transform: capitalize;

  h4,
  span {
    color: #111;
    font-weight: 600;
  }
  h4 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
`;
