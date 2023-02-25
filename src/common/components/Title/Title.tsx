import React from 'react';

import { StripStyled, TitleContainerStyled, TitleStyled } from './Title.styled';

interface TitlePropsType {
	title: string;
}

export const Title = (props: TitlePropsType) => {
	return (
		<TitleContainerStyled>
			<TitleStyled>{props.title}</TitleStyled>
			<StripStyled />
		</TitleContainerStyled>
	);
};
