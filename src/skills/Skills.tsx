import React from 'react';
import style from './Skills.module.scss';
import styleContainer from '../common/styles/Container.module.scss';
import styleCloseButton from '../common/styles/CloseButton.module.scss';
import {Skill} from './skill/Skill';
import {Title} from '../common/components/Title/Title';
import jsImage from '../assets/image/js.png';
import tsImage from '../assets/image/ts.png';
import reactImage from '../assets/image/react.png';
import reduxImage from '../assets/image/redux_black.png';
import cssImage from '../assets/image/css3_white.png';
import sassImage from '../assets/image/sass.png';
import {PATH} from "../app/App";
import {NavLink} from "react-router-dom";

export const Skills = () => {

    const js = {
        backgroundImage: `url(${jsImage})`,
    };
    const ts = {
        backgroundImage: `url(${tsImage})`,
    };
    const react = {
        backgroundImage: `url(${reactImage})`,
    };
    const redux = {
        backgroundImage: `url(${reduxImage})`,
    };
    const css = {
        backgroundImage: `url(${cssImage})`,
    };
    const sass = {
        backgroundImage: `url(${sassImage})`,
    };

    return (
        <div className={style.skillsBlock}>
            <NavLink to={PATH.MAIN} className={styleCloseButton.buttonContainer}>
                <div className={styleCloseButton.button} />
            </NavLink>
            <div className={`${styleContainer.container} ${style.skillsContainer}`}>
                <Title title={'My Skillz'}/>
                <div className={style.skills}>
                    <div className={style.skillsLevel}>
                        <Skill
                            style={js}
                            title={'JavaScript'}
                            description={'I learn JS'}
                        />
                        <Skill
                            style={css}
                            title={'CSS'}
                            description={'I learn CSS'}
                        />
                        <Skill
                            style={react}
                            title={'React'}
                            description={'I learn React'}
                        />
                    </div>
                    <div className={style.skillsLevel}>
                        <Skill
                            style={ts}
                            title={'TypeScript'}
                            description={'I learn TypeScript'}
                        />
                        <Skill
                            style={sass}
                            title={'SASS'}
                            description={'I learn SASS'}
                        />
                        <Skill
                            style={redux}
                            title={'Redux'}
                            description={'I learn Redux'}
                        />
                    </div>


                    {/*<div>
                        <Skill
                            style={js}
                            title={'JavaScript'}
                            description={'I learn JS'}
                        />
                        <Skill
                            style={ts}
                            title={'TypeScript'}
                            description={'I learn TypeScript'}
                        />
                    </div>
                    <div>
                        <Skill
                            style={css}
                            title={'CSS'}
                            description={'I learn CSS'}
                        />
                        <Skill
                            style={sass}
                            title={'SASS'}
                            description={'I learn SASS'}
                        />
                    </div>
                    <div>
                        <Skill
                            style={react}
                            title={'React'}
                            description={'I learn React'}
                        />
                        <Skill
                            style={redux}
                            title={'Redux'}
                            description={'I learn Redux'}
                        />
                    </div>*/}
                </div>
            </div>
        </div>
    );
}
