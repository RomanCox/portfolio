import React, { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { type CommonPropsType } from '../app/App';

import {
	ButtonStyled,
	CloseButtonStyled,
	PageLayoutStyled,
} from './Page.layout.styled';

type PageLayoutPropsType = CommonPropsType & {
	children: ReactNode;
	padding?: string;
};
export const PageLayout = ({
	children,
	onClickHandler,
	isShow,
	padding = '100px 0',
}: PageLayoutPropsType) => {
	const navigate = useNavigate();

	const closeHandler = () => {
		onClickHandler();
		setTimeout(navigate, 400, '/');
	};

	return (
		<PageLayoutStyled isShow={isShow} padding={padding}>
			<CloseButtonStyled>
				<ButtonStyled onClick={closeHandler} />
			</CloseButtonStyled>
			{children}
		</PageLayoutStyled>
	);
};
