import React from 'react';
import style from './TypingText.module.css';
import {TypePhase, useTyped} from "./useTyped";

type TypingTextPropsType = {
    phrases: Array<string>,
}

export const TypingText = (props: TypingTextPropsType) => {

    const typingInterval = 150;
    const pauseDuration = 1250;
    const deletingInterval = 75;

    const {text, selectedText, phase} = useTyped(props.phrases, typingInterval, pauseDuration, deletingInterval)

    let blinkingStyle =
        phase === TypePhase.Pausing ? `${style.typingText} ${style.blinkingCursor}`
            : phase !== TypePhase.Deleting ? `${style.typingText} ${style.endCursor}`
                : `${style.typingText}`

    return (
        <div className={style.textWrapper}>
            <span className={blinkingStyle} aria-label={selectedText} style={style}>{text}</span>
        </div>
    );
}