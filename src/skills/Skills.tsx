import React, { useEffect, useState } from 'react';

import { Title } from '../common/components/Title/Title';
import { type CommonPropsType } from '../app/App';
import { PageLayout } from '../layouts/Page.layout';

import { ContainerStyled } from '../common/styles/Container.styled';
import { CubesContainerStyled } from './Skills.styled';
import { Cube } from './Cube';

export interface SkillType {
	id: number;
	title: string;
	description: string;
	background: string;
}

export interface SkillCubeType {
	id: number;
	sidesCube: Array<SkillType>;
}
type CubesType = Array<SkillCubeType>;

export const Skills = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(false);

	const cubes: CubesType = [
		{
			id: 0,
			sidesCube: [
				{
					id: 0,
					title: 'HTML',
					description: 'I learn HTML',
					background: '../assets/images/html5_white.png',
				},
				{
					id: 1,
					title: 'CSS',
					description: 'I learn CSS',
					background: './skills/css3_white.png',
				},
				{
					id: 2,
					title: 'SASS',
					description: 'I learn SASS',
					background: '/src/assets/images/sass.png',
				},
				{
					id: 3,
					title: 'Styled Components',
					description: 'I learn Styled Components',
					background: 'src/assets/images/styledcomponents.png',
				},
			],
		},
		{
			id: 1,
			sidesCube: [
				{
					id: 0,
					title: 'JS',
					description: 'I learn JS',
					background: '../src/assets/images/js.png',
				},
				{
					id: 1,
					title: 'TS',
					description: 'I learn TS',
					background: '../src/assets/images/ts.png',
				},
				{
					id: 2,
					title: 'React',
					description: 'I learn React',
					background: '../src/assets/images/react.png',
				},
				{
					id: 3,
					title: 'Redux',
					description: 'I learn Redux',
					background: '../src/assets/images/redux_white.png',
				},
			],
		},
	];

	useEffect(() => {
		setTimeout(setIsDisplay, 500, true);
	}, []);
	return (
		<PageLayout isShow={isShow} onClickHandler={onClickHandler}>
			<ContainerStyled
				flexDirection='column'
				justifyContent='flex-start'
				alignItems='center'
				flexWrap='wrap'>
				<Title title={'My Skillz'} />
				<CubesContainerStyled>
					{isDisplay &&
						cubes.map((cube) => {
							return <Cube key={cube.id} cube={cube} />;
						})}
				</CubesContainerStyled>
			</ContainerStyled>
		</PageLayout>
	);
};
