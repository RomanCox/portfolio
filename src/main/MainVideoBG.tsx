import React, {useCallback, useEffect, useRef, useState} from 'react';
import style from './Main.module.scss';
import rainCode from '../assets/image/rainCode.png';
import {TypingText} from '../hooks/TypingText/TypingText';
import videoMp4 from '../assets/video/rainCode.mp4';
import videoWebm from '../assets/video/rainCode.webm';
import videoMov from '../assets/video/rainCode.mov';
import {Header} from '../header/Header';
import {CommonPropsType} from '../app/App';

export const MainVideoBG = ({onClickHandler, isShow}: CommonPropsType) => {
    const [isDisplay, setIsDisplay] = useState<boolean>(true);
    const [isPlay, setIsPlay] = useState<boolean>(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = useCallback(() => {
        if (!isPlay) {
            videoRef.current?.play()
            setIsPlay(true)
        } else {
            videoRef.current?.pause()
            setIsPlay(false)
        }
    }, [isPlay])

    const matrixBG = {
        backgroundImage: `url(${rainCode})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const phrases = ['', 'front-end developer', 'web developer', 'freelancer'];

    useEffect(() => {
        if (!isShow) {
            setTimeout(setIsDisplay, 250, false)
        } else {
            setIsDisplay(true)
        }
    }, [isShow])

    return (
        <div className={style.body}>
            {isDisplay && <Header
                onClickHandler={onClickHandler}
                isShow={isShow}
                isPlay={isPlay}
                togglePlay={togglePlay}
            />}
            <section className={style.mainBlock}>
                <div className={style.container}>
                    <div className={style.imgCover} style={matrixBG}></div>
                    <video preload='auto' autoPlay={isPlay} muted loop playsInline className={style.video} ref={videoRef} >
                        <source type='video/mp4' src={videoMp4}/>
                        <source type='video/webm' src={videoWebm}/>
                        <source type='video/mov' src={videoMov}/>
                    </video>
                    <div className={style.center}>
                        <div className={style.contentContainer}>
                            <h1 className={style.title}>Roman Cox</h1>
                            <div className={style.textContainer}>
                                <h4 className={style.text}>{`I'm a`}</h4>
                                <div className={style.typingTextContainer}>
                                    <TypingText phrases={phrases}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
