import React from 'react';

import {
	SkillDescriptionInfo,
	SkillInfoStyled,
	SkillSideBackgroundStyled,
	SkillSideContainerStyled,
	SkillTitleInfo,
} from './Skill.styled';
import { SkillType } from '../Skills';
import { RotateSideType } from './SkillCube';

interface SkillPropsType {
	skill: SkillType;
	rotateSide: RotateSideType;
}
export const SkillSide = ({ skill, rotateSide }: SkillPropsType) => {
	let delayAppearance = skill.id * 0.2;

	return (
		<SkillSideContainerStyled rotateSide={rotateSide} skillId={skill.id}>
			<SkillSideBackgroundStyled
				bg={skill.background}
				delay={delayAppearance}
			/>
			<SkillInfoStyled>
				<SkillTitleInfo>{skill.title}</SkillTitleInfo>
				<SkillDescriptionInfo>{skill.description}</SkillDescriptionInfo>
			</SkillInfoStyled>
		</SkillSideContainerStyled>
	);
};
