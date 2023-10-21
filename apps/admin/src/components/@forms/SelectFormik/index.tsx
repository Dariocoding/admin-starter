import classNames from "classnames";
import Label from "../label";
import { getIn, useFormikContext } from "formik";
import * as React from "react";
import Select from "react-tailwindcss-select";
import styled from "styled-components";

export interface OptionReactSelect {
  value: string | number | boolean;
  label: string;
}

interface ISelectFormikProps {
  label?: React.ReactNode;
  className?: string;
  classNameLabel?: string;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  showSuccess?: boolean;
  showError?: boolean;
  forceErrorMessage?: string;
  options?: OptionReactSelect[];
  multiple?: boolean;
  onChange?: (option: OptionReactSelect | OptionReactSelect[], lastState: any) => any;
  value?: string | number | boolean;
  optionSelected?: OptionReactSelect;
  sm?: boolean;
  classNameContainerSelect?: string;
}
const ContainerReactSelect = styled.div<{ sm: boolean }>`
  ${(props) =>
    props.sm
      ? `p {
	margin-top: 0 !important;
 }`
      : null}
`;

const SelectFormik: React.FunctionComponent<ISelectFormikProps> = (props) => {
  const {
    label,
    className,
    name,
    classNameLabel,
    disabled,
    placeholder,
    required,
    showError,
    showSuccess,
    forceErrorMessage,
    options = [],
    multiple,
    onChange,
    value: _value,
    optionSelected,
    sm = false,
    classNameContainerSelect,
  } = props;
  const { errors, touched, values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);
  const validateError = (error && isTouched && showError) || Boolean(forceErrorMessage);
  const validateSuccess = !error && isTouched && showSuccess && !validateError;

  function handleChange(option: OptionReactSelect | OptionReactSelect[]) {
    if (onChange) {
      setFieldValue(name, onChange(option, value));
      return;
    }
    if (!Array.isArray(option)) {
      setFieldValue(name, option.value);
    }
  }
  const valuesMultiple = value as (string | number | boolean)[];
  const selected = multiple
    ? options.filter((opt) => valuesMultiple?.some((value) => value === opt.value))
    : options.find((opt) => opt.value === value || opt.value === _value);

  const valueReactSelect =
    optionSelected ||
    (Array.isArray(selected)
      ? selected.length
        ? selected
        : [{ label: placeholder, value: null }]
      : selected);

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

      <ContainerReactSelect sm={sm} style={{ height: "34px" }}>
        <Select
          isClearable={false}
          isMultiple={multiple}
          isDisabled={disabled}
          placeholder={placeholder}
          noOptionsMessage={placeholder}
          primaryColor={null}
          //@ts-ignore
          value={valueReactSelect}
          //@ts-ignore
          onChange={handleChange}
          // @ts-ignore
          options={options}
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-gray-500 border border-gray-300 shadow-sm transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-gray-50 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              } ${sm ? "!h-[34px]" : ""} ${
                classNameContainerSelect?.includes?.("rounded") ? classNameContainerSelect : null
              }`,
          }}
        />
      </ContainerReactSelect>
    </div>
  );
};

export default SelectFormik;
