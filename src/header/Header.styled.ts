import styled from 'styled-components';

type HeaderStyledPropstype = {
    isShow: boolean,
}
export const HeaderContainerStyled = styled.header<HeaderStyledPropstype>`
  width: 100%;
  height: 70px;
  padding: 23px 50px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${({isShow}) => isShow ? 'appearance 200ms ease-in normal forwards 1' : 'disappearance 200ms ease-in normal forwards 1'};
  transform-origin: right top;

  @keyframes appearance {
    from {top: -100%}
    to {top: 0}
  }

  @keyframes disappearance {
    from {transform: rotate(0)}
    to {transform: rotate(90deg)}
  }
`;