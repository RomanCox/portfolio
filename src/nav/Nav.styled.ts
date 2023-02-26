import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavbarStyled = styled.nav`
	max-width: 406px;
	@include flex(row, space-between, center, 20px);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	list-style: none;
`;

export const NavbarItemStyled = styled(NavLink)`
	display: list-item;
	text-align: -webkit-match-parent;
	font-family: 'Josefin Sans', sans-serif;
	font-size: 20px;
	font-weight: 400;
	line-height: 1.2;
	color: #fff;
	text-decoration: none;
	cursor: pointer;
	user-select: none;

	&:visited {
		color: #fff;
	}
`;
