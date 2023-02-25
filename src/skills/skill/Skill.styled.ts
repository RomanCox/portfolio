import styled from 'styled-components';
import { RotateSideType } from './SkillCube';

interface SkillContainerStyledPropsType {
	rotateSide: RotateSideType;
	skillId: number;
}
interface BackgroundStyledPropsType {
	bg: string;
	delay: number;
}
export const SkillContainerStyled = styled.div`
	width: 200px;
	height: 300px;
	display: flex;
	flex-direction: column;
`;

export const SkillSideContainerStyled = styled(
	SkillContainerStyled,
)<SkillContainerStyledPropsType>`
	position: absolute;
	top: 0;
	left: 0;
	transform-origin: ${({ skillId }) =>
		skillId === 0 ? 'right center' : 'left center'};
	transform: ${({ rotateSide }) => rotateSide};
	animation: rotateCube 2s ease-out 0.6s 1 normal forwards;

	@keyframes rotateCube {
		0% {
			transform: ${({ rotateSide }) => rotateSide};
		}
		100% {
			transform: ${({ skillId }) =>
				skillId === 0 ? 'rotateY(-90deg)' : 'rotateY(0)'};
		}
	}
`;

export const SkillSideBackgroundStyled = styled.div<BackgroundStyledPropsType>`
	width: 100%;
	height: calc(100% - 100px);
	border-radius: 10px;
	border: 1px solid #999999;
	background-image: url(${({ bg }) => bg});
	background-size: contain;
`;

export const SkillBackgroundStyled = styled(
	SkillSideBackgroundStyled,
)<BackgroundStyledPropsType>`
	transform: translateY(-1000px);
	animation: ${({ delay }) =>
		`appearanceSkill 1s ease-out ${delay}s 1 normal forwards`};

	@keyframes appearanceSkill {
		0% {
			transform: translateY(-1000px);
		}
		25% {
			transform: translateY(0);
		}
		40% {
			transform: rotate(20deg);
			transform-origin: right bottom;
		}
		55% {
			transform: rotate(-15deg);
			transform-origin: left bottom;
		}
		70% {
			transform: rotate(10deg);
			transform-origin: right bottom;
		}
		85% {
			transform: rotate(-5deg);
			transform-origin: left bottom;
		}
		100% {
			transform: rotate(0);
		}
	}
`;

export const SkillInfoStyled = styled.div`
	height: 100px;
	padding: 25px 0;
	user-select: none;
`;

export const SkillTitleInfo = styled.h3`
	margin: 0 0 5px;
	font-family: 'Josefin Sans', sans-serif;
	font-size: 16px;
	font-weight: 700;
	line-height: 120%;
	color: white;
	letter-spacing: 1px;
`;

export const SkillDescriptionInfo = styled.span`
	font-family: 'Poppins', sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 180%;
	color: #9f9f9f;
	letter-spacing: 1px;
`;
