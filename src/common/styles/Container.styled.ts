import styled from 'styled-components';

type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexType = 'flex-start' | 'flex-end' | 'center';
type JustifyContentType =
	| FlexType
	| 'space-between'
	| 'space-around'
	| 'space-evenly';
type AlignItemsType = FlexType | 'baseline ' | 'stretch';

interface ContainerStyledPropsType {
	flexDirection: FlexDirectionType;
	justifyContent: JustifyContentType;
	alignItems: AlignItemsType;
	gap?: number;
}

export const ContainerStyled = styled.div<ContainerStyledPropsType>`
	height: 100%;
	width: 80%;
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection};
	justify-content: ${({ justifyContent }) => justifyContent};
	align-items: ${({ alignItems }) => alignItems};
	gap: ${({ gap }) => (gap ? gap + 'px' : 'normal')};
	position: relative;
	z-index: 3;
`;
