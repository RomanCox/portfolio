import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import redPill from '../assets/images/red_pill.png';
import bluePill from '../assets/images/blue_pill.png';
import { CommonPropsType, PATH } from '../app/App';
import { Canvas } from '../common/components/Background/Canvas';
import {
	ButtonsContainer,
	ButtonsTitle,
	ButtonsWrapper,
	ErrorPageContainer,
	Glitch404,
	GlitchText,
	GlitchTextWrapper,
	GlitchTitle,
	GlitchWrapper,
} from './404.styled';
import { PageLayout } from '../layouts/Page.layout';

export const Error404 = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(false);

	const closePage = () => {
		alert('If u want to stay in Matrix - lets close this page');
	};

	useEffect(() => {
		setTimeout(setIsDisplay, 500, true);
	}, []);
	return (
		<PageLayout isShow={isShow} onClickHandler={onClickHandler}>
			{isDisplay && 'Error 404'}
		</PageLayout>
	);
};
