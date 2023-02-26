import React, {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
} from 'react';

import style from './Button.module.scss';
import { ButtonTitleStyled } from './Button.styled';

type DefaultButtonPropsType = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

type ButtonPropsType = DefaultButtonPropsType & {
	title?: string;
	type?: 'button' | 'submit' | 'reset' | 'undefined';
};

export const Button: React.FC<ButtonPropsType> = ({
	title,
	type, // достаём и игнорируем чтоб нельзя было задать другой тип input

	...restProps // все остальные пропсы попадут в объект restProps
}) => {
	const onClickHandler = () => {
		alert('hello');
	};

	return (
		<button className={style.button} type={type} {...restProps}>
			<ButtonTitleStyled onClick={onClickHandler}>
				{title}
			</ButtonTitleStyled>
		</button>
	);
};
