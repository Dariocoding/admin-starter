import classNames from "classnames";
import { getIn, useFormikContext } from "formik";
import * as React from "react";
import Label from "../label";
import { RenderIf } from "@/components/ui";

interface ITextareaFormikProps {
  label?: React.ReactNode;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  showSuccess?: boolean;
  showError?: boolean;
  forceErrorMessage?: string;
  rows?: number;
  cols?: number;
}

const TextareaFormik: React.FunctionComponent<ITextareaFormikProps> = (props) => {
  const {
    label,
    className,
    name,
    classNameLabel,
    classNameInput,
    disabled,
    placeholder,
    required,
    showError,
    showSuccess,
    forceErrorMessage,
    rows = 5,
    cols = 5,
  } = props;

  const { errors, touched, handleBlur, handleChange, values } = useFormikContext();
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

      <textarea
        className={classNames("form-control", classNameInput)}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        id={name}
        onBlur={handleBlur}
        onChange={handleChange}
        rows={rows}
        cols={cols}
        value={value}
      />

      <RenderIf isTrue={validateError}>
        <p>{error || forceErrorMessage}</p>
      </RenderIf>
    </div>
  );
};

export default TextareaFormik;
