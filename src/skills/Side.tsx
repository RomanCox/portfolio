import React from 'react';

import { SkillType } from './Skills';
import { SideStyled } from './Skills.styled';
import { DirectionType } from './Cube';

interface SkillPropsType {
	side: SkillType;
	direction: DirectionType;
}
export const Side = ({ side, direction }: SkillPropsType) => {
	return (
		<SideStyled
			bg={side.background}
			sideId={side.id}
			direction={direction}
		/>
	);
};
