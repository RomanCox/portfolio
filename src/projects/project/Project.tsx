import React from 'react';
import style from './Project.module.scss'

type ProjectPropsType = {
    style: { backgroundImage: string, },
    title: string,
    description: string,
    link?: string,
}

export const Project = ({title, description, link = '', ...props}: ProjectPropsType) => {
    return (
        <div className={style.project}>
            <a className={style.image} style={props.style} href={link}></a>
            <div className={style.projectInfo}>
                <h3 className={style.projectTitle}><a href={link}>{title}</a></h3>
                <span className={style.description}>{description}</span>
            </div>
        </div>
    )
}