import * as React from "react";

interface IRenderIfProps {
  children?: React.ReactNode;
  isTrue?: any;
}

const RenderIf: React.FunctionComponent<IRenderIfProps> = (props) => {
  if (!props.isTrue) return null;

  return <>{props.children}</>;
};

export default RenderIf;
