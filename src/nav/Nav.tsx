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
            <div className={style.navbarItem} onClick={onClickHandler}>
                <NavLink to={PATH.MAIN}>Main</NavLink>
            </div>
            <div className={style.navbarItem} onClick={onClickHandler}>
                <NavLink to={PATH.SKILLS}>My Skillz</NavLink>
            </div>
            <div className={style.navbarItem} onClick={onClickHandler}>
                <NavLink to={PATH.PROJECTS}>My Projects</NavLink>
            </div>
            <div className={style.navbarItem} onClick={onClickHandler}>
                <NavLink to={PATH.CONTACTS}>My Contacts</NavLink>
            </div>
        </nav>
    );
}
