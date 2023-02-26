import React, { useState } from 'react';

import { PATH } from '../app/App';
import { useWindowSize } from '../hooks/useWindowSize';
import { BurgerMenu } from '../header/BurgerMenu';

import { NavbarItemStyled, NavbarStyled } from './Nav.styled';

interface NavPropsType {
	onClickHandler: () => void;
}
export const Nav = ({ onClickHandler }: NavPropsType) => {
	const [isBurgerMenuOpened, setIsBurgerMenuOpened] =
		useState<boolean>(false);
	const window = useWindowSize();

	return window.width && window.width > 600 ? (
		<NavbarStyled>
			<NavbarItemStyled to={PATH.SKILLS} onClick={onClickHandler}>
				My Skillz
			</NavbarItemStyled>
			<NavbarItemStyled to={PATH.PROJECTS} onClick={onClickHandler}>
				My Projects
			</NavbarItemStyled>
			<NavbarItemStyled to={PATH.CONTACTS} onClick={onClickHandler}>
				My Contacts
			</NavbarItemStyled>
			<NavbarItemStyled to={PATH.ERROR} onClick={onClickHandler}>
				Error
			</NavbarItemStyled>
		</NavbarStyled>
	) : (
		<BurgerMenu
			isBurgerMenuOpened={isBurgerMenuOpened}
			setIsBurgerMenuOpened={setIsBurgerMenuOpened}
			onClickHandler={onClickHandler}
		/>
	);
};
