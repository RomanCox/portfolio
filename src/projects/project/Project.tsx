import React from 'react';
import style from './Project.module.scss'

type ProjectPropsType = {
    style: { backgroundImage: string, },
    title: string,
    description: string,
    link?: string,
}

export const Project = ({title, description, link = '#', ...props}: ProjectPropsType) => {
    return (
        <div className={style.project}>
            {link === '#'
                ? <div className={style.image} style={props.style} />
                : <a className={style.linkImage} style={props.style} href={link} target={'_blank'} rel={'nofollow noreferrer'}></a>}
            <div className={style.projectInfo}>
                <h3 className={style.projectTitle}>
                    {link === '#'
                        ? title
                        : <a href={link} target={'_blank'} rel={'nofollow noreferrer'}>{title}</a>}
                </h3>
                <span className={style.description}>{description}</span>
            </div>
        </div>
    )
}