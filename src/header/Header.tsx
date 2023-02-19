import React from 'react';

import { Nav } from '../nav/Nav';
import { type CommonPropsType } from '../app/App';

import { PlayIcon } from '../assets/icons/play.Icon';
import { PauseIcon } from '../assets/icons/pause.Icon';

import { HeaderContainerStyled, PlayButtonContainerStyled } from './Header.styled';

type HeaderPropsType = CommonPropsType & {
	isPlay: boolean
	togglePlay: () => void
}

export const Header = ({ onClickHandler, isShow, isPlay, togglePlay }: HeaderPropsType) => {
	return (
		<HeaderContainerStyled isShow={isShow}>
			<PlayButtonContainerStyled onClick={togglePlay}>
				{isPlay
					? <PauseIcon />
					: <PlayIcon />
				}
			</PlayButtonContainerStyled>
			<Nav onClickHandler={onClickHandler}/>
		</HeaderContainerStyled>
	);
};
