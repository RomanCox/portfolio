import React from 'react';

import { PATH } from '../app/App';

import {
	BurgerMenuStyled,
	BurgerMenuWrapperStyled,
	LinksContainerStyled,
} from './Header.styled';
import { BurgerButton } from './BurgerButton';
import { NavbarItemStyled } from '../nav/Nav.styled';

export interface BurgerStyledPropsType {
	isBurgerMenuOpened: boolean;
}
export type BurgerButtonPropsType = BurgerStyledPropsType & {
	setIsBurgerMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

type BurgerPropsType = BurgerButtonPropsType & {
	onClickHandler: () => void;
};

export const BurgerMenu = ({
	isBurgerMenuOpened,
	setIsBurgerMenuOpened,
	onClickHandler,
}: BurgerPropsType) => {
	const closeBurgerMenu = () => {
		setIsBurgerMenuOpened(false);
	};

	return (
		<>
			<BurgerMenuWrapperStyled
				isBurgerMenuOpened={isBurgerMenuOpened}
				onClick={closeBurgerMenu}>
				<BurgerMenuStyled
					isBurgerMenuOpened={isBurgerMenuOpened}
					onClick={(event: React.MouseEvent) => {
						event.stopPropagation();
					}}>
					<LinksContainerStyled>
						<NavbarItemStyled
							to={PATH.SKILLS}
							onClick={onClickHandler}>
							My Skillz
						</NavbarItemStyled>
						<NavbarItemStyled
							to={PATH.PROJECTS}
							onClick={onClickHandler}>
							My Projects
						</NavbarItemStyled>
						<NavbarItemStyled
							to={PATH.CONTACTS}
							onClick={onClickHandler}>
							My Contacts
						</NavbarItemStyled>
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
