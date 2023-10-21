import Label from "@/components/@forms/label";
import { useConfigApp } from "@/store";
import * as React from "react";

interface IInputColorProps {
  name: string;
  children?: React.ReactNode;
}

const InputColor: React.FunctionComponent<IInputColorProps> = (props) => {
  const { name } = props;
  const { colors, setColors } = useConfigApp();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors({ ...colors, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-group">
      <Label>{props.children}</Label>
      <input
        type="text"
        value={colors[name]}
        className="form-control"
        name={name}
        onChange={onChangeInput}
        disabled={!colors.isThemed}
      />
    </div>
  );
};

export default InputColor;
