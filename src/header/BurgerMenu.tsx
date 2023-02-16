import React, {SetStateAction} from 'react';
import {BurgerMenuStyled, BurgerMenuWrapperStyled} from './Header.styled';
import {BurgerButton} from './BurgerButton';

export type BurgerStyledPropsType = {
    isBurgerMenuOpened: boolean,
}
export type BurgerPropsType = BurgerStyledPropsType & {
    setIsBurgerMenuOpened: React.Dispatch<SetStateAction<boolean>>,
}

export const BurgerMenu = ({isBurgerMenuOpened, setIsBurgerMenuOpened}: BurgerPropsType) => {
    const closeBurgerMenu = () => {
        setIsBurgerMenuOpened(false);
    };

    return (
        <>
            <BurgerMenuWrapperStyled
                isBurgerMenuOpened={isBurgerMenuOpened}
                onClick={closeBurgerMenu}
            >
                <BurgerMenuStyled
                    isBurgerMenuOpened={isBurgerMenuOpened}
                    onClick={(event: React.MouseEvent) => event.stopPropagation()}
                >
                </BurgerMenuStyled>
            </BurgerMenuWrapperStyled>
            <BurgerButton
                isBurgerMenuOpened={isBurgerMenuOpened}
                setIsBurgerMenuOpened={setIsBurgerMenuOpened}
            />
        </>
    );
};
