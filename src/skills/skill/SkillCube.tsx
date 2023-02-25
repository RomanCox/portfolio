import React, { useEffect, useState } from 'react';

import { Skill } from './Skill';
import { SkillType } from '../Skills';
import { SkillSide } from './SkillSide';
import { SkillSideContainerStyled } from '../Skills.styled';

interface SkillCubePropsType {
	skillCube: Array<SkillType>;
}
export type RotateSideType = 'rotateY(0)' | 'rotateY(90deg)' | 'rotateX(90deg)';

export const SkillCube = ({ skillCube }: SkillCubePropsType) => {
	const [isAppearance, setIsAppearance] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(setIsAppearance, 1000, true);
	}, []);
	return (
		<>
			{isAppearance ? (
				<SkillSideContainerStyled>
					<SkillSide skill={skillCube[0]} rotateSide='rotateY(0)' />
					<SkillSide
						skill={skillCube[1]}
						rotateSide='rotateY(90deg)'
					/>
				</SkillSideContainerStyled>
			) : (
				<Skill skill={skillCube[0]} />
			)}
		</>
	);
};
