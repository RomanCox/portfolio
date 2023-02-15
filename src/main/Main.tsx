import React, {useEffect, useState} from 'react';
import style from './Main.module.scss';
import {TypingText} from '../hooks/TypingText/TypingText';
import {Canvas} from '../common/components/Background/Canvas';
import {Header} from '../header/Header';
import {CommonPropsType} from '../app/App';

export const Main = ({onClickHandler, isShow}: CommonPropsType) => {
    const [isDisplay, setIsDisplay] = useState<boolean>(true);

    useEffect(() => {
        if (!isShow) {
            setTimeout(setIsDisplay, 250, false)
        } else {
            setIsDisplay(true)
        }
    }, [isShow])

    const phrases = ['', 'front-end developer', 'web developer', 'freelancer']

    return (
        <div className={style.body}>
            {isDisplay && <Header onClickHandler={onClickHandler} isShow={isShow}/>}
            <Canvas color={'green'}/>
            <section className={style.mainBlock}>
                {isShow
                    ?   <div className={style.container}>
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
                    : null
                }
                {/*{isShow*/}
                {/*    ?   <div className={style.center}>*/}
                {/*        {isNameShow && <div className={style.textContainer}>*/}
                {/*            <span className={style.title}>my name: </span>*/}
                {/*            <TypeIt*/}
                {/*                className={style.typingText}*/}
                {/*                as={'span'}*/}
                {/*                options={options}*/}
                {/*                getBeforeInit={instance => {*/}
                {/*                    console.log(instance)*/}
                {/*                    instance.pause(250).type('Roman Cxo').pause(500).delete(2).type('ox')*/}

                {/*                    return instance*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </div>}*/}
                {/*        {isDescriptionShow && <div className={style.textContainer}>*/}
                {/*            <div className={style.title}>I am: </div>*/}
                {/*        </div>}*/}
                {/*        </div>*/}
                {/*    : null*/}
                {/*}*/}
            </section>
        </div>

    )
}
