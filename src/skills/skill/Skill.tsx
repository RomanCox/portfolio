import React from 'react';

import {
	SkillContainerStyled,
	SkillBackgroundStyled,
	SkillInfoStyled,
	SkillTitleInfo,
	SkillDescriptionInfo,
} from './Skill.styled';
import { SkillType } from '../Skills';

interface SkillPropsType {
	skill: SkillType;
}
export const Skill = ({ skill }: SkillPropsType) => {
	let delayAppearance = skill.id * 0.2;

	return (
		<SkillContainerStyled>
			<SkillBackgroundStyled
				bg={skill.background}
				delay={delayAppearance}
			/>
			<SkillInfoStyled>
				<SkillTitleInfo>{skill.title}</SkillTitleInfo>
				<SkillDescriptionInfo>{skill.description}</SkillDescriptionInfo>
			</SkillInfoStyled>
		</SkillContainerStyled>
	);
};
