import styled from 'styled-components';
import { DirectionType } from './Cube';

interface SideStyledPropsType {
	sideId: number;
	direction: DirectionType;
}

interface CubeStyledPropsType {
	isRotate: boolean;
	sideCube: number;
	direction: DirectionType;
	delay: number;
}
interface CubeContainerStyledPropType {
	delay: number;
}

export const CubesContainerStyled = styled.div`
	width: 100%;
	margin-top: 200px;
	display: flex;
	justify-content: space-between;

	@media screen and (max-width: 768px) {
		display: inline;
	}
`;

export const CubeWrapper = styled.div`
	width: 250px;
	height: 300px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

export const CubeContainerStyled = styled.div<CubeContainerStyledPropType>`
	width: 200px;
	height: 200px;
	display: block;
	position: relative;
	perspective: 1000px;
	transform: translateY(-1000px);
	animation: ${({ delay }) =>
		`fallingCube 1s ease-out ${delay}s 1 normal forwards`};
	@keyframes fallingCube {
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

export const CubeStyled = styled.div<CubeStyledPropsType>`
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	position: absolute;
	transform-origin: 100px 100px -100px;
	transform-box: fill-box;
	animation: ${({ isRotate, sideCube, delay, direction }) =>
		isRotate
			? `${direction}Rotate${sideCube} 0.8s ease-out ${delay}s 1 normal forwards`
			: `none`};

	@keyframes horizontalRotate0 {
		0% {
			transform: rotateY(0);
		}
		100% {
			transform: rotateY(90deg);
		}
	}
	@keyframes horizontalRotate1 {
		0% {
			transform: rotateY(90deg);
		}
		100% {
			transform: rotateY(180deg);
		}
	}
	@keyframes horizontalRotate2 {
		0% {
			transform: rotateY(180deg);
		}
		100% {
			transform: rotateY(270deg);
		}
	}
	@keyframes horizontalRotate3 {
		0% {
			transform: rotateY(270deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}

	@keyframes verticalRotate0 {
		0% {
			transform: rotateX(0);
		}
		100% {
			transform: rotateX(90deg);
		}
	}
	@keyframes verticalRotate1 {
		0% {
			transform: rotateX(90deg);
		}
		100% {
			transform: rotateX(180deg);
		}
	}
	@keyframes verticalRotate2 {
		0% {
			transform: rotateX(180deg);
		}
		100% {
			transform: rotateX(270deg);
		}
	}
	@keyframes verticalRotate3 {
		0% {
			transform: rotateX(270deg);
		}
		100% {
			transform: rotateX(360deg);
		}
	}
`;

export const SideStyled = styled.div<SideStyledPropsType>`
	width: 100%;
	height: 100%;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	border: 1px solid #282828;
	border-radius: 20px;
	background-color: #1f1f20;
	backface-visibility: hidden;
	overflow: hidden;
	transform-origin: 100px 100px -100px;
	transform-box: fill-box;
	transform: ${({ sideId, direction }) =>
		sideId === 0
			? 'none'
			: sideId === 1
			? direction === 'horizontal'
				? 'rotateY(-90deg)'
				: 'rotateX(-90deg)'
			: sideId === 2
			? direction === 'horizontal'
				? 'rotateY(180deg)'
				: 'rotateY(180deg) rotateZ(180deg)'
			: direction === 'horizontal'
			? 'rotateY(90deg)'
			: 'rotateX(90deg)'};

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

export const SkillTitleStyled = styled.div`
	text-align: center;
	font-family: 'Josefin Sans', sans-serif;
	font-size: 32px;
	font-weight: 700;
	line-height: 120%;
	color: black;
	letter-spacing: 1px;
	user-select: none;
	text-shadow: none;
	animation: appearanceText ease-in forwards 0.4s 0.25s;

	@keyframes appearanceText {
		0% {
			color: black;
			text-shadow: none;
		}
		20% {
			color: #c2ffec;
			text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #0affa9,
				0 0 0.5em #0affa9, 0 0 0.1em #0affa9, 0 10px 3px #000;
		}
		25% {
			color: black;
			text-shadow: none;
		}
		30% {
			color: black;
			text-shadow: none;
		}
		35% {
			color: #c2ffec;
			text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #0affa9,
				0 0 0.5em #0affa9, 0 0 0.1em #0affa9, 0 10px 3px #000;
		}
		50% {
			color: #c2ffec;
			text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #0affa9,
				0 0 0.5em #0affa9, 0 0 0.1em #0affa9, 0 10px 3px #000;
		}
		55% {
			color: black;
			text-shadow: none;
		}
		65% {
			color: black;
			text-shadow: none;
		}
		75% {
			color: #c2ffec;
			text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #0affa9,
				0 0 0.5em #0affa9, 0 0 0.1em #0affa9, 0 10px 3px #000;
		}
		90% {
			color: #c2ffec;
			text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #0affa9,
				0 0 0.5em #0affa9, 0 0 0.1em #0affa9, 0 10px 3px #000;
		}
		95% {
			color: black;
			text-shadow: none;
		}
		100% {
			color: #c2ffec;
			text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #0affa9,
				0 0 0.5em #0affa9, 0 0 0.1em #0affa9, 0 10px 3px #000;
		}
	}

	span {
		animation: blink linear infinite 1s;
	}

	span:nth-last-of-type(odd) {
		animation: blink linear infinite 1.5s;
	}

	@keyframes blink {
		78% {
			color: inherit;
			text-shadow: inherit;
		}
		79% {
			color: #333;
		}
		80% {
			text-shadow: none;
		}
		81% {
			color: inherit;
			text-shadow: inherit;
		}
		82% {
			color: #333;
			text-shadow: none;
		}
		83% {
			color: inherit;
			text-shadow: inherit;
		}
		92% {
			color: #333;
			text-shadow: none;
		}
		92.5% {
			color: inherit;
			text-shadow: inherit;
		}
	}
`;
