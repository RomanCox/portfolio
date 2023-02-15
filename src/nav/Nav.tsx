import React from 'react';
import style from './Nav.module.scss';
import {NavLink} from 'react-router-dom';
import {PATH} from '../app/App';

type NavPropsType = {
    onClickHandler: () => void,
}
export const Nav = ({onClickHandler}: NavPropsType) => {
    return (
        <nav className={style.navbar}>
            <NavLink to={PATH.MAIN} className={style.navbarItem} onClick={onClickHandler}>Main</NavLink>
            <NavLink to={PATH.SKILLS} className={style.navbarItem} onClick={onClickHandler}>My Skillz</NavLink>
            <NavLink to={PATH.PROJECTS} className={style.navbarItem} onClick={onClickHandler}>My Projects</NavLink>
            <NavLink to={PATH.CONTACTS} className={style.navbarItem} onClick={onClickHandler}>My Contacts</NavLink>
        </nav>
    );
}
