import React, {
	type ChangeEvent,
	type DetailedHTMLProps,
	type TextareaHTMLAttributes,
	type KeyboardEvent,
} from 'react';

import style from './Textarea.module.scss';

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type TextAreaPropsType = DefaultTextareaPropsType & {
	onChangeText?: (value: string) => void
	onEnter?: () => void
	error?: string
	spanClassName?: string
	background?: string
	backgroundColor?: string
	placeholder?: string
	textareaError?: boolean
	rows?: number
	wrap?: 'hard' | 'soft' | 'off'
}

export const Textarea: React.FC<TextAreaPropsType> = (
	{
		onChange, onChangeText,
		onKeyDown, onEnter,
		error, textareaError,
		backgroundColor = '#282828', spanClassName,
		background, placeholder,
		rows, wrap,

		...restProps
	},
) => {
	const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange && onChange(e);

		onChangeText && onChangeText(e.currentTarget.value);
	};
	const onKeyDownCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		onKeyDown && onKeyDown(e);

		onEnter && e.key === 'Enter' && onEnter();
	};

	const finalSpanClassName = `${style.span} ${textareaError ? style.spanError : ''} ${spanClassName ?? ''}`;
	const myTextareaStyle = `${backgroundColor}
    	${style.textarea}
    	${error ? style.error : ''}
    	${textareaError ? style.textareaError : ''}
    `;

	const barStyle = `${style.bar} ${textareaError ? style.barError : ''}`;

	return (
		<div className={style.container}>
			<textarea
				rows={rows}
				wrap={wrap}
				onChange={onChangeCallback}
				onKeyDown={onKeyDownCallback}
				className={myTextareaStyle}

				{...restProps}
			/>
			<span className={barStyle}>{}</span>
			<label className={style.label}>{placeholder}</label>

			{textareaError && <span className={finalSpanClassName}>{error}</span>}
		</div>
	);
};
