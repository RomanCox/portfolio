import React from 'react';
import style from './Nav.module.scss';
import {NavLink} from 'react-router-dom';
import {PATH} from '../app/App';

export const Nav = () => {
    return (
        <nav className={style.header}>
            {/*<a>*/}
            {/*    <img></img>*/}
            {/*</a>*/}
            {/*<div className={style.navButtonContainer}>*/}
            {/*    BUTTON*/}
            {/*</div>*/}
            <div className={style.navContainer}>
                <div className={style.navbar}>
                    <div className={style.navbarItem}>
                        <NavLink to={PATH.MAIN}>Main</NavLink>
                    </div>
                    <div className={style.navbarItem}>
                        <NavLink to={PATH.SKILLS}>My Skillz</NavLink>
                    </div>
                    <div className={style.navbarItem}>
                        <NavLink to={PATH.PROJECTS}>My Projects</NavLink>
                    </div>
                    <div className={style.navbarItem}>
                        <NavLink to={PATH.CONTACTS}>My Contacts</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
