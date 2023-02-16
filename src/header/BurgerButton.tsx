import React from 'react';
import {BarsStyled, BurgerButtonStyled} from './Header.styled';
import {BurgerPropsType} from './BurgerMenu';

export const BurgerButton = ({isBurgerMenuOpened, setIsBurgerMenuOpened}: BurgerPropsType) => {
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
