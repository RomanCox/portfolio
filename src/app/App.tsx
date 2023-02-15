import React, {useState} from 'react';
import {MainVideoBG} from '../main/MainVideoBG';
import {Skills} from '../skills/Skills';
import {Projects} from '../projects/Projects';
import {Contacts} from '../contacts/Contacts';
import {Error404} from '../404/404';
import {Route, Routes} from 'react-router-dom';
import {Main} from '../main/Main';
import {Empty} from '../main/Empty';

export type CommonPropsType = {
    onClickHandler: () => void,
    isShow: boolean
}
export const PATH = {
    EMPTY: '/',
    MAIN: '/main',
    SKILLS: '/skills',
    PROJECTS: '/projects',
    CONTACTS: '/contacts',
}
export const App = () => {
    const [isShow, setIsShow] = useState<boolean>(true);

    const openPage = () => {
        setIsShow(false)
    }
    const closePage = () => {
        setIsShow(true)
    }

    return (
        <>
            <MainVideoBG onClickHandler={openPage} isShow={isShow} />
            <Routes>
                <Route path={PATH.EMPTY} element={<Empty />}/>
                <Route path={PATH.MAIN} element={<Main onClickHandler={closePage} isShow={isShow} />}/>
                <Route path={PATH.SKILLS} element={<Skills onClickHandler={closePage} isShow={isShow} />}/>
                <Route path={PATH.PROJECTS} element={<Projects />}/>
                <Route path={PATH.CONTACTS} element={<Contacts />}/>
                <Route path='*' element={<Error404 />}/>
            </Routes>
        </>
    );
}