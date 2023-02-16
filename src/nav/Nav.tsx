import React, {useState} from 'react';
import style from './Nav.module.scss';
import {NavLink} from 'react-router-dom';
import {PATH} from '../app/App';
import {useWindowSize} from '../hooks/useWindowSize';
import {BurgerMenu} from '../header/BurgerMenu';

type NavPropsType = {
    onClickHandler: () => void,
}
export const Nav = ({onClickHandler}: NavPropsType) => {
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState<boolean>(false);
    const window = useWindowSize();
    console.log(isBurgerMenuOpened);

    return (
        window.width && window.width > 600
            ? <nav className={style.navbar}>
                <NavLink to={PATH.SKILLS} className={style.navbarItem} onClick={onClickHandler}>My Skillz</NavLink>
                <NavLink to={PATH.PROJECTS} className={style.navbarItem} onClick={onClickHandler}>My Projects</NavLink>
                <NavLink to={PATH.CONTACTS} className={style.navbarItem} onClick={onClickHandler}>My Contacts</NavLink>
            </nav>
            : <BurgerMenu isBurgerMenuOpened={isBurgerMenuOpened} setIsBurgerMenuOpened={setIsBurgerMenuOpened}/>
    );
}
