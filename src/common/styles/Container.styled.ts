import styled from 'styled-components';

type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexType = 'flex-start' | 'flex-end' | 'center';
type JustifyContentType =
	| FlexType
	| 'space-between'
	| 'space-around'
	| 'space-evenly';
type AlignItemsType = FlexType | 'baseline ' | 'stretch';
type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';

interface ContainerStyledPropsType {
	flexDirection: FlexDirectionType;
	justifyContent: JustifyContentType;
	alignItems: AlignItemsType;
	flexWrap: FlexWrapType;
	gap?: number;
}

export const ContainerStyled = styled.div<ContainerStyledPropsType>`
	height: 100%;
	width: 80%;
	margin: 0 auto;
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection};
	justify-content: ${({ justifyContent }) => justifyContent};
	align-items: ${({ alignItems }) => alignItems};
	flex-wrap: ${({ flexWrap }) => flexWrap};
	gap: ${({ gap = 0 }) => gap + 'px'};
	position: relative;
	z-index: 3;
`;
