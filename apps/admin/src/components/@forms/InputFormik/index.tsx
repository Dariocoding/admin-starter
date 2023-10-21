import { useFormikContext, getIn, Field } from "formik";
import * as React from "react";
import classNames from "classnames";
import Label from "../label";
import RenderIf from "@/components/ui/RenderIf";
import { NumericFormat } from "react-number-format";

interface IInputFormikProps {
  type?: React.HTMLInputTypeAttribute;
  label?: React.ReactNode;
  className?: string;
  autoComplete?: "on" | "off";
  classNameInput?: string;
  classNameLabel?: string;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  showSuccess?: boolean;
  showError?: boolean;
  forceErrorMessage?: string;
  decimalValues?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;
  allowNegative?: boolean;
  allowedDecimalSeparators?: boolean;
  decimalScale?: number;
}

const InputFormik: React.FunctionComponent<IInputFormikProps> = (props) => {
  const {
    type = "text",
    label,
    className,
    autoComplete = "on",
    name,
    classNameLabel,
    classNameInput,
    disabled,
    placeholder,
    required,
    showError = true,
    showSuccess = true,
    forceErrorMessage,
    decimalValues = true,
    onFocus = () => null,
    onBlur = () => null,
    onChange,
    allowNegative = false,
    decimalScale = 3,
  } = props;
  const { errors, values, touched, setFieldValue, handleBlur } = useFormikContext();
  const isInputNumber = type === "number";
  const value = getIn(values, name);
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);
  const validateError = (error && isTouched && showError) || Boolean(forceErrorMessage);
  const validateSuccess = !error && isTouched && showSuccess && !validateError;

  return (
    <div
      className={classNames(
        "form-group",
        validateError ? "form-group-error" : null,
        validateSuccess ? "form-group-success" : null,
        className
      )}
    >
      <Label htmlFor={name} required={required} className={classNameLabel}>
        {label}
      </Label>

      {isInputNumber ? (
        <NumericFormat
          value={value}
          thousandSeparator={"."}
          decimalSeparator={","}
          onValueChange={(values) => setFieldValue(name, values.floatValue)}
          prefix={decimalValues ? "$ " : ""}
          onBlur={(e) => handleBlur(e)}
          onFocus={onFocus}
          className={classNames("form-control", classNameInput)}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          name={name}
          id={name}
          allowNegative={allowNegative}
          decimalScale={decimalScale}
        />
      ) : (
        <Field
          type={type}
          className={classNames("form-control", classNameInput)}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value || ""}
          onBlur={(e) => {
            handleBlur(e);
            onBlur();
          }}
          onFocus={onFocus}
          onChange={(e) => {
            onChange?.();
            setFieldValue(name, e.target.value);
          }}
        />
      )}

      <RenderIf isTrue={validateError}>
        <p>{error || forceErrorMessage}</p>
      </RenderIf>
    </div>
  );
};

export default InputFormik;
