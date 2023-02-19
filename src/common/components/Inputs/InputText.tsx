import React, { type ChangeEvent, type DetailedHTMLProps, type InputHTMLAttributes, type KeyboardEvent } from 'react';

import s from './InputText.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
	onChangeText?: (value: string) => void
	onEnter?: () => void
	error?: string
	spanClassName?: string
	background?: string
	backgroundColor?: string
	placeholder?: string
	inputError?: boolean
	style?: { input: { width: string }, bar: { width: string } }
}

export const InputText: React.FC<InputTextPropsType> = (
	{
		type,
		onChange, onChangeText,
		onKeyDown, onEnter,
		error, inputError,
		backgroundColor = '282828', spanClassName,
		background, placeholder, style,

		...restProps
	},
) => {
	const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e);

		onChangeText && onChangeText(e.currentTarget.value);
	};
	const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
		onKeyDown && onKeyDown(e);

		onEnter && e.key === 'Enter' && onEnter();
	};

	const finalSpanClassName = `${s.span} ${inputError ? s.spanError : ''} ${spanClassName ?? ''}`;
	const myInputStyle = `${backgroundColor}
    ${s.input}
    ${error ? s.error : ''}
    ${inputError ? s.inputError : ''}`;

	const barClassName = `${s.bar} ${inputError ? s.barError : ''}`;

	return (
		<div className={s.container}>
			<input
				type={'text'}
				onChange={onChangeCallback}
				onKeyDown={onKeyDownCallback}
				className={myInputStyle}

				{...restProps}
			/>
			<span className={barClassName}>{}</span>
			<label className={s.label}>{placeholder}</label>

			{inputError && <span className={finalSpanClassName}>{error}</span>}
		</div>
	);
};
