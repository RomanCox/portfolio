import React, { useEffect, useState } from 'react';

import { Title } from '../common/components/Title/Title';
import { type CommonPropsType } from '../app/App';
import { PageLayout } from '../layouts/Page.layout';
import htmlImage from '../assets/images/skills/html5_white.png';
import css from '../assets/images/skills/css3_white.png';
import sass from '../assets/images/skills/sass.png';
import styledComponents from '../assets/images/skills/styledcomponents.png';
import js from '../assets/images/skills/js.png';
import ts from '../assets/images/skills/ts.png';
import react from '../assets/images/skills/react.png';
import redux from '../assets/images/skills/redux_white.png';

import { ContainerStyled } from '../common/styles/Container.styled';
import { CubesContainerStyled } from './Skills.styled';
import { Cube } from './Cube';
import { useWindowSize } from '../hooks/useWindowSize';
import Carousel from 'react-material-ui-carousel';

export interface SkillType {
	id: number;
	title: string;
	description: string;
	img: string;
}

export interface SkillCubeType {
	id: number;
	sidesCube: Array<SkillType>;
}
type CubesType = Array<SkillCubeType>;

export const Skills = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(false);
	const [isDesktop, setIsDesktop] = useState<boolean>(true);
	const windowSize = useWindowSize();

	const cubes: CubesType = [
		{
			id: 0,
			sidesCube: [
				{
					id: 0,
					title: 'HTML',
					description: 'I learn HTML',
					img: htmlImage,
				},
				{
					id: 1,
					title: 'CSS',
					description: 'I learn CSS',
					img: css,
				},
				{
					id: 2,
					title: 'SASS',
					description: 'I learn SASS',
					img: sass,
				},
				{
					id: 3,
					title: 'Styled Components',
					description: 'I learn Styled Components',
					img: styledComponents,
				},
			],
		},
		{
			id: 1,
			sidesCube: [
				{
					id: 0,
					title: 'JavaScript',
					description: 'I learn JS',
					img: js,
				},
				{
					id: 1,
					title: 'TypeScript',
					description: 'I learn TS',
					img: ts,
				},
				{
					id: 2,
					title: 'React',
					description: 'I learn React',
					img: react,
				},
				{
					id: 3,
					title: 'Redux',
					description: 'I learn Redux',
					img: redux,
				},
			],
		},
	];

	useEffect(() => {
		if (windowSize.width && windowSize.width > 768 && !isDesktop) {
			setIsDesktop(true);
		} else if (windowSize.width && windowSize.width <= 768 && isDesktop) {
			setIsDesktop(false);
		}
	}, [windowSize.width]);

	useEffect(() => {
		setTimeout(setIsDisplay, 500, true);
	}, []);
	return (
		<PageLayout isShow={isShow} onClickHandler={onClickHandler}>
			<ContainerStyled
				flexDirection='column'
				justifyContent='flex-start'
				alignItems='center'>
				<Title title={'My Skillz'} />
				<CubesContainerStyled>
					{isDesktop
						? isDisplay &&
						  cubes.map((cube) => {
								return <Cube key={cube.id} cube={cube} />;
						  })
						: isDisplay && (
								<Cube cube={cubes[1]} />
								// <Carousel
								// 	height='400px'
								// 	autoPlay={false}
								// 	cycleNavigation
								// 	animation='slide'
								// 	swipe
								// 	navButtonsAlwaysInvisible>
								// 	{cubes.map((cube) => {
								// 		return (
								// 			<Cube
								// 				key={cube.id}
								// 				cube={cube}
								// 			/>
								// 		);
								// 	})}
								// </Carousel>
						  )}
				</CubesContainerStyled>
			</ContainerStyled>
		</PageLayout>
	);
};
