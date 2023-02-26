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
		<SideStyled sideId={side.id} direction={direction}>
			<img src={side.img} alt='logo' width='100%' height='100%' />
		</SideStyled>
	);
};
