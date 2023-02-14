import React from 'react';
import './App.scss';
import {MainVideoBG} from '../main/MainVideoBG';
import {Skills} from '../skills/Skills';
import {Projects} from '../projects/Projects';
import {Contacts} from '../contacts/Contacts';
import {Error404} from '../404/404';
import {Route, Routes} from 'react-router-dom';
import {Main} from '../main/Main';

export const PATH = {
    MAINVIDEOBG: '/',
    MAIN: '/main',
    SKILLS: '/skills',
    PROJECTS: '/projects',
    CONTACTS: '/contacts',
    ERROR404: '/error',
}
export const App = () => {
    return (
        <Routes>
            <Route path={PATH.MAINVIDEOBG} element={<MainVideoBG/>} />
            <Route path={PATH.MAIN} element={<Main/>} />
            <Route path={PATH.SKILLS} element={<Skills/>} />
            <Route path={PATH.PROJECTS} element={<Projects/>} />
            <Route path={PATH.CONTACTS} element={<Contacts/>} />
            <Route path={PATH.ERROR404} element={<Error404/>} />
            <Route path='*' element={<Error404/>}/>
        </Routes>
    );
}