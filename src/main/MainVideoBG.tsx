import React from 'react';
import style from './Main.module.scss';
import rainCode from '../assets/image/rainCode.png';
import {Nav} from '../nav/Nav';
import {TypingText} from '../hooks/TypingText/TypingText';
import videoMp4 from '../assets/video/rainCode.mp4';
import videoWebm from '../assets/video/rainCode.webm';
import videoMov from '../assets/video/rainCode.mov';

export const MainVideoBG = () => {

    const matrixBG = {
        backgroundImage: `url(${rainCode})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const phrases = ['', 'front-end developer', 'web developer', 'freelancer']

    return (
            <div className={style.body}>
                <Nav/>
                <section className={style.mainBlock}>
                    <div className={style.container}>
                        <div className={style.imgCover} style={matrixBG}></div>
                        <video preload='auto' autoPlay muted loop playsInline className={style.video}>
                            <source type='video/mp4' src={videoMp4}/>
                            <source type='video/webm' src={videoWebm}/>
                            <source type='video/mov' src={videoMov}/>
                        </video>
                        <div className={style.center}>
                            <div className={style.textContainer}>
                                <h1 className={style.selection}>Roman Cox</h1>
                                <h4>{`I'm a`}
                                    <div className={style.typingTextContainer}>
                                        <TypingText phrases={phrases}/>
                                    </div>
                                </h4>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

    )
}
