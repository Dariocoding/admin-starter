import { Switch } from "@headlessui/react";
import { getIn, useFormikContext } from "formik";
import * as React from "react";
import Label from "../label";
import classNames from "classnames";

interface ISwitchFormikProps {
  name: string;
  className?: string;
  classNameLabel?: string;
  label?: React.ReactNode;
}

const SwitchFormik: React.FunctionComponent<ISwitchFormikProps> = (props) => {
  const { name, className, label, classNameLabel } = props;
  const { values, setFieldValue } = useFormikContext();

  const enabled = getIn(values, name) as boolean;

  const onChange = () => {
    setFieldValue(name, !enabled);
  };

  return (
    <div className={classNames("form-group", className)}>
      <Label className={classNameLabel}>{label}</Label>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
};

export default SwitchFormik;
