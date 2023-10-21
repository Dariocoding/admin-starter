import { colorsCromatics, tailwindColors } from "@/utils";
import * as React from "react";
import ColorCromatic from "./ColorCromatic";

interface IShowColorsProps {}

const ShowColors: React.FunctionComponent<IShowColorsProps> = (props) => {
  const {} = props;

  const colorsDividedByCromatics = colorsCromatics.map((colorCromatic) => ({
    name: colorCromatic,
    colors: tailwindColors.filter(
      (color) =>
        color.startsWith("bg-" + colorCromatic) || color.startsWith("text-" + colorCromatic)
    ),
  }));

  return (
    <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
      {colorsDividedByCromatics.map((colorCromatic, idx) => (
        <ColorCromatic key={idx} {...colorCromatic} />
      ))}
    </div>
  );
};

export default ShowColors;
