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
import { ContainerStyled } from '../common/styles/Container.styled';

export const Error404 = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(false);

	const closePage = () => {
		alert('If u want to stay in Matrix - lets close this page');
	};

	useEffect(() => {
		setTimeout(setIsDisplay, 500, true);
	}, []);
	return (
		<PageLayout isShow={isShow} onClickHandler={onClickHandler} padding='0'>
			<ContainerStyled
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				width='100%'>
				<Canvas color={'red'} />
				{isDisplay && (
					<ErrorPageContainer>
						<GlitchWrapper>
							<Glitch404>404</Glitch404>
							<GlitchTitle>
								You are lost in the matrix...
							</GlitchTitle>
							<GlitchTextWrapper>
								<GlitchText>
									Don`&#39;`t try and bend the website -
									that`&#39;`s impossible.
								</GlitchText>
								<GlitchText>
									Instead, only try to realize the truth.
								</GlitchText>
								<GlitchText>
									The truth is that: There is no page.
								</GlitchText>
								<GlitchText>
									Then you`&#39;`ll see, that it isn`&#39;`t
									the website that bends...
								</GlitchText>
								<GlitchText>
									It`&#39;`s only yourself.
								</GlitchText>
							</GlitchTextWrapper>
						</GlitchWrapper>
						<ButtonsWrapper>
							<ButtonsTitle>
								Choose: Matrix or Reality?
							</ButtonsTitle>
							<ButtonsContainer>
								<NavLink to={PATH.EMPTY}>
									<img src={redPill} alt={'red pill'} />
								</NavLink>
								<img
									src={bluePill}
									onClick={closePage}
									alt={'blue pill'}
								/>
							</ButtonsContainer>
						</ButtonsWrapper>
					</ErrorPageContainer>
				)}
			</ContainerStyled>
		</PageLayout>
	);
};
