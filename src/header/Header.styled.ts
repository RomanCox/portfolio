import styled from 'styled-components';

import { type BurgerStyledPropsType } from './BurgerMenu';

interface HeaderStyledPropsType {
	isShow: boolean
}

export const HeaderContainerStyled = styled.header<HeaderStyledPropsType>`
  width: 100%;
  height: 70px;
  padding: 17px 50px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${({ isShow }) => isShow
		? 'appearance 200ms ease-in normal forwards 1'
		: 'disappearance 200ms ease-in normal forwards 1'
};
  transform-origin: right top;

  @keyframes appearance {
    from {
      top: -100%
    }
    to {
      top: 0
    }
  }

  @keyframes disappearance {
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(90deg)
    }
  }
`;

export const PlayButtonContainerStyled = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BurgerMenuWrapperStyled = styled.div<BurgerStyledPropsType>`
  background-color: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? 'rgba(0, 0, 0, 0.3)' : ''};
  height: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? '100%' : ''};
  width: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? '100%' : ''};
  position: fixed;
  top: 0;
  right: 0;
  transition: all 0.3s linear;
`;

export const BurgerMenuStyled = styled.div<BurgerStyledPropsType>`
  width: 70%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #1D1D1D;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 68px 16px 72px 16px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? 'translateX(0)' : 'translateX(100%)'};
`;

export const LinksContainerStyled = styled.nav`
  display: flex;
  flex-direction: column;

  a {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.2;
    color: white;
    text-decoration: none;
    user-select: none;

    &:visited {
      color: white;
    }
  }
`;

export const BurgerButtonStyled = styled.div`
  width: 30px;
  height: 30px;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BarsStyled = styled.div<BurgerStyledPropsType>`
  width: 90%;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? 'transparent' : 'white'};
  position: relative;
  transition: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? 'all 0ms 300ms' : 'none'};

  &:before {
    content: "";
    width: 100%;
    height: 5px;
    border-radius: 2.5px;
    position: absolute;
    left: 0;
    bottom: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? '0' : '10px'};
    transform: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? 'rotate(-45deg)' : 'none'};
    background-color: white;
    transition: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened
		? 'bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1)'
		: 'bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1)'
};
  }
;

  &:after {
    content: "";
    width: 100%;
    height: 5px;
    border-radius: 2.5px;
    position: absolute;
    left: 0;
    top: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? '0' : '10px'};
    transform: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened ? 'rotate(45deg)' : 'none'};
    background-color: white;
    transition: ${({ isBurgerMenuOpened }) => isBurgerMenuOpened
		? 'top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1)'
		: 'top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1)'
};
  }
;
`;
