import React, {useEffect, useState} from 'react';
import style from './404.module.scss';
import redPill from '../assets/image/red_pill.png'
import bluePill from '../assets/image/blue_pill.png'
import {PATH} from '../app/App';
import {NavLink} from 'react-router-dom';
import { Canvas } from '../common/components/Background/Canvas';

export const Error404 = () => {
    const [isShow, setIsShow] = useState(false);

    const closePage = () => {
        alert('If u want to stay in Matrix - lets close this page')
    }

    useEffect(() => {
        setTimeout(setIsShow, 1500, true)
    }, [])

    return (
        <div>
            <Canvas color={'red'} />
            <div className={style.fixedContainer}>
                {isShow
                    ?   <div className={style.glitchWrapper}>
                            <div className={style.glitch404}>404</div>
                            <div className={style.glitchTitle}>You are lost in the matrix...</div>
                            <div className={style.glitchTextWrapper}>
                                <div className={style.glitchText}>Don't try and bend the website - that's impossible.</div>
                                <div className={style.glitchText}>Instead, only try to realize the truth.</div>
                                <div className={style.glitchText}>The truth is that: There is no page.</div>
                                <div className={style.glitchText}>Then you'll see, that it isn't the website that bends...</div>
                                <div className={style.glitchText}>It's only yourself.</div>
                            </div>
                        </div>
                    : null}
                {isShow
                    ?   <div className={style.buttonsWrapper}>
                            <div className={style.buttonsTitle}>Choose: Matrix or Reality?</div>
                            <div className={style.buttonsContainer}>
                                <NavLink to={PATH.MAIN}>
                                    <img src={redPill} alt={'red pill'}/>
                                </NavLink>
                                <img src={bluePill} onClick={closePage} alt={'blue pill'}/>
                            </div>
                        </div>
                    : null}
            </div>
        </div>
    );
}