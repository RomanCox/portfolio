import styled from 'styled-components';

interface PageLayoutStyledPropsType {
	isShow: boolean
}
export const PageLayoutStyled = styled.div<PageLayoutStyledPropsType>`
  max-width: 100%;
  max-height: 100%;
  padding: 100px 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #1f1f20;
  animation: ${({ isShow }) => isShow
		? 'disappearance 400ms linear 1 normal forwards'
		: 'appearance 500ms ease-in 1 normal forwards'};
  overflow: hidden;
  
  &::after {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    background: white;
    opacity: 0;
    left: 0;
    top: 0;
    animation: ${({ isShow }) => isShow ? 'disappearance_after 400ms linear 1 normal forwards' : 'none'};
  }

  @keyframes appearance {
    0% {top: 100%}
    60% {top: -120px}
    70% {top: 60px}
    80% {top: -30px}
    90% {top: 15px}
    100% {top: 0}
  }

  @keyframes disappearance {
    0% {
      transform: scale3d(1, 1, 1);
    }
    20% {
      transform: scale3d(1, 1.6, 1);
    }
    50% {
      transform: scale3d(1, 0.005, 1);
    }
    100% {
      transform: scale3d(0, 0, 1);
    }
  }

  @keyframes disappearance_after {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const CloseButtonStyled = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  z-index: 3;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transition: transform .25s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }
`;

export const ButtonStyled = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;

  &:focus {
    border: none;
    outline: none;
  }

  &:after,
  &:before {
    content: '';
    width: 40px;
    height: 6px;
    border-radius: 3px;
    background: white;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &:after {
    transform: translate(-50%, 0) rotate(45deg);
  }

  &:before {
    transform: translate(-50%, 0) rotate(-45deg);
  }

`;
