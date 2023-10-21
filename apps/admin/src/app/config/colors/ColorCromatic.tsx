import { capitalize } from "@/utils";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/Dropdown/DropdownItem";
import ToolTip from "@/components/ui/Tooltip";
import classNames from "classnames";
import * as React from "react";
import { toast } from "react-hot-toast";

interface IColorCromaticProps {
  name: string;
  colors: string[];
}

const ColorCromatic: React.FunctionComponent<IColorCromaticProps> = (props) => {
  const { ...colorCromatic } = props;

  const onClickCopy = (color: string, prefix: string) => {
    const [_, name, grade] = color.split("-");
    navigator.clipboard.writeText(`${prefix}-${name}-${grade}`);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      <h2 className={classNames("text-2xl mb-4")}>{capitalize(colorCromatic.name)}</h2>
      <div className="flex items-start justify-start flex-wrap gap-4">
        {colorCromatic.colors
          .filter((color) => color.startsWith("bg"))
          .map((color, idx) => (
            <Dropdown
              placement={"right"}
              key={idx}
              displayButton={
                <ToolTip
                  message="Click to copy color"
                  placement="top"
                  key={idx}
                  className="cursor-pointer hover:scale-110 transition"
                >
                  <div className={classNames(color, "w-14 h-8 rounded-lg inline-block")}></div>
                  <p className="text-xs font-semibold">
                    {color
                      .replaceAll("bg-", "")
                      .replaceAll("-", " ")
                      .replaceAll(colorCromatic.name, "")}
                  </p>
                </ToolTip>
              }
            >
              <DropdownItem onClick={() => onClickCopy(color, "text")}>Text</DropdownItem>
              <DropdownItem onClick={() => onClickCopy(color, "bg")}>Background</DropdownItem>
              <DropdownItem onClick={() => onClickCopy(color, "hover:bg")}>
                Hover:background
              </DropdownItem>
            </Dropdown>
          ))}
      </div>
    </div>
  );
};

export default ColorCromatic;
