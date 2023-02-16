import React from 'react';
import { Nav } from '../nav/Nav';
import {CommonPropsType} from '../app/App';
import {HeaderContainerStyled, PlayButtonContainerStyled, PlayButtonStyled} from './Header.styled';

type HeaderPropsType = CommonPropsType & {
    isPlay: boolean,
    togglePlay: () => void,
}

export const Header = ({onClickHandler, isShow, isPlay, togglePlay}: HeaderPropsType) => {
    return (
        <HeaderContainerStyled isShow={isShow}>
            <PlayButtonContainerStyled>
                <PlayButtonStyled isPlay={isPlay} onClick={togglePlay} />
            </PlayButtonContainerStyled>
            <Nav onClickHandler={onClickHandler}/>
        </HeaderContainerStyled>
    );
};
