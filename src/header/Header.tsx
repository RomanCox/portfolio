import React from 'react';
import style from './Header.module.scss'
import { Nav } from '../nav/Nav';
import {CommonPropsType} from '../app/App';
import {HeaderContainerStyled} from './Header.styled';

export const Header = ({onClickHandler, isShow}: CommonPropsType) => {
    return (
        /*<header className={style.header}>*/
        <HeaderContainerStyled isShow={isShow}>
            {/*<a>*/}
            {/*    <img></img>*/}
            {/*</a>*/}
            <div className={style.navButtonContainer}>
                BUTTON
            </div>
            <Nav onClickHandler={onClickHandler}/>
        </HeaderContainerStyled>
        /*</header>*/
    );
};
