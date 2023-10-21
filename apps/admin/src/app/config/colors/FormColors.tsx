import * as React from "react";
import InputColor from "./InputColor";
import { useConfigApp } from "@/store";
import Checkbox from "@/components/ui/Checkbox";
import RenderIf from "@/components/ui/RenderIf";
import classNames from "classnames";

interface IFormColorsProps {}

const FormColors: React.FunctionComponent<IFormColorsProps> = (props) => {
  const {} = props;
  const { colors, setColors } = useConfigApp();

  return (
    <div>
      <div className="form-group">
        <h6 className="text-lg mb-1">Header colors</h6>
        <div className="grid lg:grid-cols-2 gap-x-4">
          <InputColor name="headerTop">Header Top</InputColor>
          <InputColor name="topLogoContainer">Top logo container</InputColor>
        </div>
      </div>
      <div className="form-group">
        <h6 className="text-lg mb-1">Sidebar colors</h6>
        <div className="grid lg:grid-cols-2 gap-x-4">
          <InputColor name="sidebarItemHover">Sidebar item hover</InputColor>
          <InputColor name="hoverNavToggle">Hover Nav Toggle</InputColor>
          <InputColor name="sidebarContainer">Sidebar container</InputColor>
          <InputColor name="sidebarDropdownCollapsedContainer">
            Sidebar dropdown collapsed container
          </InputColor>
          <InputColor name="sidebarItemDropdown">Sidebar item dropdown</InputColor>
          <InputColor name="textSubtitleSidebar">Sidebar Text subtitle</InputColor>
        </div>
      </div>
      <div>
        <h6 className="text-lg mb-1">Extras</h6>
        <div className="grid lg:grid-cols-2 gap-x-4">
          <InputColor name="loaderColor">Loader color</InputColor>
          <InputColor name="backgroundHome">Background Home</InputColor>
          <InputColor name="textColor">Text Color</InputColor>
          <div className="grid grid-cols-2">
            <div>
              <div className={classNames(colors.isThemed ? "mt-5" : "mt-10")}>
                <Checkbox
                  onChange={() =>
                    setColors({
                      isThemed: !colors.isThemed,
                    })
                  }
                  isChecked={colors.isThemed}
                >
                  <span className="text-xs">Is themed</span>
                </Checkbox>
              </div>
              <RenderIf isTrue={colors.isThemed}>
                <span className="inline-block pt-1">
                  <Checkbox
                    onChange={() =>
                      setColors({
                        isThemeDarkLogin: !colors.isThemeDarkLogin,
                      })
                    }
                    isChecked={colors.isThemeDarkLogin}
                  >
                    <span className="text-xs">Themed Login</span>
                  </Checkbox>
                </span>
              </RenderIf>
            </div>
            <div>
              <div className={classNames("form-group mb-0", colors.isThemed ? "mt-5" : "mt-10")}>
                <Checkbox
                  onChange={() =>
                    setColors({
                      isHeaderTop: !colors.isHeaderTop,
                    })
                  }
                  isChecked={colors.isHeaderTop}
                >
                  <span className="text-xs">Header Top</span>
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormColors;
