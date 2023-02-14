import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    title?: string,
    type?: 'button' | 'submit' | 'reset' | 'undefined',
}

export const Button: React.FC<ButtonPropsType> = (
    {
        title, type, // достаём и игнорируем чтоб нельзя было задать другой тип input

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {

    const onClickHandler = () => {
        alert('hello')
    }

    return (
        <button className={s.button} type={type} {...restProps}>
            <span className={s.title} onClick={onClickHandler}>{title}</span>
        </button>
    )
}