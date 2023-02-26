import styled from 'styled-components';

export const ButtonStyled = styled.button`
	width: 100%;
	min-width: 100px;
	height: 100%;
	padding: 0 20px;
	background: #009e66;
	color: #fff;
	border: 2px solid #009e66;
	border-radius: 10px;
	outline: none;
	transition: 0.5s ease-in-out;
	cursor: pointer;

	&:hover {
		background: #1f1f20;
		color: #009e66;
	}
`;

export const ButtonTitleStyled = styled.span`
	font-family: 'Josefin Sans', sans-serif;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.2;
	color: #fff;
`;
