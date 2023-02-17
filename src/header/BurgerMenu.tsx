import React from 'react';
import { BurgerMenuStyled, BurgerMenuWrapperStyled, LinksContainerStyled } from './Header.styled';
import { BurgerButton } from './BurgerButton';
import style from '../nav/Nav.module.scss';
import { NavLink } from 'react-router-dom';
import { PATH } from '../app/App';

export type BurgerStyledPropsType = {
    isBurgerMenuOpened: boolean,
}
export type BurgerButtonPropsType = BurgerStyledPropsType & {
    setIsBurgerMenuOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

type BurgerPropsType = BurgerButtonPropsType & {
    onClickHandler: () => void,
}

export const BurgerMenu = ({isBurgerMenuOpened, setIsBurgerMenuOpened, onClickHandler}: BurgerPropsType) => {
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
                    <LinksContainerStyled>
                        <NavLink to={PATH.SKILLS} className={style.navbarItem} onClick={onClickHandler}>My Skillz</NavLink>
                        <NavLink to={PATH.PROJECTS} className={style.navbarItem} onClick={onClickHandler}>My Projects</NavLink>
                        <NavLink to={PATH.CONTACTS} className={style.navbarItem} onClick={onClickHandler}>My Contacts</NavLink>
                    </LinksContainerStyled>
                </BurgerMenuStyled>
            </BurgerMenuWrapperStyled>
            <BurgerButton
                isBurgerMenuOpened={isBurgerMenuOpened}
                setIsBurgerMenuOpened={setIsBurgerMenuOpened}
            />
        </>
    );
};
