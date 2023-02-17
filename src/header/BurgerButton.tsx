import React from 'react';
import {BarsStyled, BurgerButtonStyled} from './Header.styled';
import {BurgerButtonPropsType} from './BurgerMenu';

export const BurgerButton = ({isBurgerMenuOpened, setIsBurgerMenuOpened}: BurgerButtonPropsType) => {
    const onClickHandler = () => {
        setIsBurgerMenuOpened(!isBurgerMenuOpened)
    }

    return (
        <BurgerButtonStyled onClick={onClickHandler}>
            <BarsStyled
                isBurgerMenuOpened={isBurgerMenuOpened}
            />
        </BurgerButtonStyled>
    );
};
