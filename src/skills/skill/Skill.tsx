import React from 'react';
import style from './Skill.module.scss';

type SkillPropstype = {
    style: { backgroundImage: string },
    title: string,
    description: string,
}

export const Skill = (props: SkillPropstype) => {
    return (
        <div className={style.skill}>
            <div className={style.image} style={props.style}></div>
            <div className={style.skillInfo}>
                <h3 className={style.skillTitle}>{props.title}</h3>
                <span className={style.description}>{props.description}</span>
            </div>
        </div>
    );
}
