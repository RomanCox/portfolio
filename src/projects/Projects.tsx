import React, {useEffect, useState} from 'react';
import style from './Projects.module.scss';
import styleContainer from '../common/styles/Container.module.scss';
import {Project} from './project/Project';
import {Title} from '../common/components/Title/Title';
import todoListImage from '../assets/image/todolist.png';
import socialImage from '../assets/image/social.png';
import {CommonPropsType} from '../app/App';
import {PageLayout} from '../layouts/Page.layout';

export const Projects = ({onClickHandler, isShow}: CommonPropsType) => {
    const [isDisplay, setIsDisplay] = useState<boolean>(false)

    const todoList = {
        backgroundImage: `url(${todoListImage})`,
    };

    const social = {
        backgroundImage: `url(${socialImage})`,
    };

    useEffect(() =>  {
        setTimeout(setIsDisplay, 500, true)
    }, [])

    return (
        <PageLayout isShow={isShow} onClickHandler={onClickHandler}>
            <div className={`${styleContainer.container} ${style.projectsContainer}`}>
                <Title title={'My Projects'}/>
                {isDisplay && <div className={style.projects}>
                    <Project
                        style={todoList}
                        title={'TodoList'}
                        description={'sd gflksa gflkg kjsanfkjsndfklmlk kjasndkjsafdl kamslkd'}
                        link={'https://todolist-xi-seven.vercel.app'}
                    />
                    <Project
                        style={social}
                        title={'Social Network'}
                        description={'salkdnmgf oian gfkjag'}
                    />
                </div>}
            </div>
        </PageLayout>
    );
}
