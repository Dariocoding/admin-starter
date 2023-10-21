import Label from "@/components/@forms/label";
import { useConfigApp } from "@/store";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";

interface IOptionsAppProps {}

const OptionsApp: React.FunctionComponent<IOptionsAppProps> = (props) => {
  const {} = props;
  const { setColors, colors } = useConfigApp();
  return (
    <div className="grid grid-cols-2">
      <div className={classNames("form-group mb-2")}>
        <Label className={""}>Enable Clothes Shopping</Label>
        <Switch
          checked={colors.enableClothesShopping}
          onChange={() =>
            setColors({ ...colors, enableClothesShopping: !colors.enableClothesShopping })
          }
          className={`${
            colors.enableClothesShopping ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              colors.enableClothesShopping ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default OptionsApp;
