import styled from 'styled-components';

export const TitleContainerStyled = styled.div`
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
`;

export const TitleStyled = styled.h2`
	margin: 0;
	font-family: 'Josefin Sans', sans-serif;
	font-size: 54px;
	font-weight: 700;
	line-height: 1.2;
	color: #fff;
	text-transform: capitalize;
	letter-spacing: 5px;
	user-select: none;
`;

export const StripStyled = styled.div`
	width: 75px;
	height: 4px;
	background: #009e66;
	position: relative;

	&::before,
	&::after {
		content: '';
		width: 4px;
		height: 100%;
		background: #1f1f20;
		position: absolute;
		top: 0;
	}

	&::before {
		left: 0;
		animation: leftDotAnimation 3s infinite linear;
	}

	&::after {
		left: 8px;
		animation: rightDotAnimation 3s infinite linear;
	}

	@keyframes leftDotAnimation {
		from {
			left: 0;
		}
		to {
			left: 75px;
		}
	}

	@keyframes rightDotAnimation {
		from {
			left: 8px;
		}
		to {
			left: 83px;
		}
	}
`;
