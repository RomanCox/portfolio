import React, { useEffect, useRef, useState } from 'react';

import { SkillCubeType } from './Skills';
import { CubeContainerStyled, CubeStyled, CubeWrapper } from './Skills.styled';
import { Side } from './Side';
import { SkillTitle } from './SkillTitle';

interface SkillPropsType {
	cube: SkillCubeType;
}
export type DirectionType = 'horizontal' | 'vertical';
export const Cube = ({ cube }: SkillPropsType) => {
	const [isRotate, setIsRotate] = useState<boolean>(false);
	const [isTextLight, setIsTextLight] = useState<boolean>(false);
	const [sideCube, setSideCube] = useState<number>(0);
	const [title, setTitle] = useState<string>(cube.sidesCube[sideCube].title);
	let cubeTimeOut = useRef<NodeJS.Timeout | null>();

	let direction: DirectionType = cube.id === 0 ? 'horizontal' : 'vertical';
	const delayFallingCube = cube.id * 0.2;
	const delayShowText = 750;
	const delayRotate = 2500;
	//let delayRotate = cube.id * 0.5;

	const stopAnimation = () => {
		if (cubeTimeOut.current) {
			clearTimeout(cubeTimeOut.current);
			cubeTimeOut.current = null;
		}
	};

	const startAnimation = () => {
		if (cubeTimeOut.current) {
			return;
		}
		cubeTimeOut.current = setTimeout(sideTurn, delayRotate);
	};

	const sideTurn = () => {
		if (sideCube === 3) {
			setSideCube(0);
		} else {
			setSideCube(sideCube + 1);
		}
	};

	useEffect(() => {
		const title =
			sideCube === 3
				? cube.sidesCube[0].title
				: cube.sidesCube[sideCube + 1].title;
		if (!isRotate) {
			cubeTimeOut.current = setTimeout(sideTurn, delayRotate + 1600);
			setTimeout(setTitle, 1600, title);
		} else {
			cubeTimeOut.current = setTimeout(sideTurn, delayRotate);
			setTitle(title);
		}
	}, [sideCube]);

	useEffect(() => {
		setTimeout(setIsRotate, 1600, true);
		setTimeout(setIsTextLight, delayShowText, true);
	}, []);
	return (
		<CubeWrapper>
			<CubeContainerStyled
				delay={delayFallingCube}
				onMouseEnter={stopAnimation}
				onMouseLeave={startAnimation}>
				<CubeStyled
					isRotate={isRotate}
					sideCube={sideCube}
					delay={0}
					direction={direction}>
					{cube.sidesCube.map((side) => {
						return (
							<Side
								key={side.id}
								side={side}
								direction={direction}
							/>
						);
					})}
				</CubeStyled>
			</CubeContainerStyled>
			<SkillTitle title={title} isTextLight={isTextLight} />
		</CubeWrapper>
	);
};
