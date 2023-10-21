import { useConfigApp } from "@/store";
import { ColorsAdmin } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";

export interface IButtonRecommendedColorProps {
  color: ColorsAdmin;
  className?: string;
  name?: React.ReactNode;
}

const ButtonRecommendedColor: React.FunctionComponent<IButtonRecommendedColorProps> = (props) => {
  const { color, className, name } = props;
  const { setColors } = useConfigApp();
  return (
    <button
      className={classNames("btn btn-sm text-white uppercase", className)}
      type="button"
      onClick={() => setColors(color)}
    >
      {name}
    </button>
  );
};

export default ButtonRecommendedColor;
