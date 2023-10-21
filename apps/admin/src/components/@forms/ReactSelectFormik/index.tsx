import classNames from 'classnames';
import { getIn, useFormikContext } from 'formik';
import * as React from 'react';
import Select from 'react-select';
import Label from '../label';
import { OptionReactSelect } from '../SelectFormik';

interface IReactSelectFormikProps {
	label?: React.ReactNode;
	className?: string;
	classNameSelect?: string;
	classNameLabel?: string;
	disabled?: boolean;
	name: string;
	placeholder?: string;
	required?: boolean;
	showSuccess?: boolean;
	showError?: boolean;
	forceErrorMessage?: string;
	options?: OptionReactSelect[];
	onChange?: (option: OptionReactSelect, lastState: any) => any;
	value?: string | number | boolean;
	sm?: boolean;
	isSearchable?: boolean;
	optionSelected?: OptionReactSelect;
}

const ReactSelectFormik: React.FunctionComponent<IReactSelectFormikProps> = props => {
	const {
		name,
		showError,
		showSuccess,
		forceErrorMessage,
		required,
		label,
		className,
		classNameLabel,
		options,
		placeholder,
		onChange,
		value: _value,
		disabled,
		sm,
		isSearchable,
		optionSelected,
	} = props;

	const { errors, touched, values, setFieldValue } = useFormikContext();
	const value = getIn(values, name);
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);
	const validateError = (error && isTouched && showError) || Boolean(forceErrorMessage);
	const validateSuccess = !error && isTouched && showSuccess && !validateError;

	function handleChange(option: OptionReactSelect) {
		if (onChange) {
			setFieldValue(name, onChange(option, value));
			return;
		}
		if (!Array.isArray(option)) {
			setFieldValue(name, option.value);
		}
	}
	const selected = options.find(opt => opt.value === value || opt.value === _value);

	return (
		<div
			className={classNames(
				'form-group',
				validateError ? 'form-group-error' : null,
				validateSuccess ? 'form-group-success' : null,
				className
			)}
		>
			<Label htmlFor={name} required={required} className={classNameLabel}>
				{label}
			</Label>

			<Select
				isClearable={false}
				isDisabled={disabled}
				placeholder={placeholder}
				value={optionSelected || selected}
				onChange={handleChange}
				options={options}
				isSearchable={isSearchable}
				styles={{
					control: (base, state) => ({
						...base,
						borderColor: state.isFocused
							? '#80bdff'
							: base.borderColor,
						boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
						'&:hover': {
							borderColor: state.isFocused
								? '#80bdff'
								: base.borderColor,
						},
						'&:focus': {
							borderColor: state.isFocused
								? '#80bdff'
								: base.borderColor,
						},
						// gray background
						background: '#f8f9fa',
						minHeight: 'auto',
					}),
					placeholder: (base, state) => ({
						...base,
						color: '#6c757d',
						paddingTop: 0,
						paddingBottom: 0,
					}),
					indicatorSeparator: (base, state) => ({
						...base,
						display: 'none',
					}),
					menu: (base, state) => ({
						...base,
						zIndex: 100,
					}),
					menuList: (base, state) => ({
						...base,
						zIndex: 100,
					}),
					singleValue: (base, state) => ({
						...base,
						color: '#6c757d',
					}),
					option: (base, state) => ({
						...base,
						fontSize: sm ? '0.75rem' : '0.875rem',
					}),

					valueContainer: (base, state) => ({
						...base,
						padding: sm ? '0.05rem 0.75rem' : '0.25rem 0.75rem',
						fontSize: sm ? '0.75rem' : '0.875rem',
					}),
				}}
			/>
		</div>
	);
};

export default ReactSelectFormik;
