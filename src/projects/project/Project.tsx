import React from 'react';
import style from './Project.module.scss'

type ProjectPropsType = {
    style: { backgroundImage: string, },
    title: string,
    description: string,
}

export const Project = (props: ProjectPropsType) => {
    return (
        <div className={style.project}>
            <a className={style.image} style={props.style}></a>
            <div className={style.projectInfo}>
                <h3 className={style.projectTitle}>{props.title}</h3>
                <span className={style.description}>{props.description}</span>
            </div>
        </div>
    )
}