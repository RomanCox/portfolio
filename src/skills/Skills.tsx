import React, { useEffect, useState } from 'react';

import styleContainer from '../common/styles/Container.module.scss';

import { Title } from '../common/components/Title/Title';
import jsImage from '../assets/image/js.png';
import tsImage from '../assets/image/ts.png';
import reactImage from '../assets/image/react.png';
import reduxImage from '../assets/image/redux_black.png';
import cssImage from '../assets/image/css3_white.png';
import sassImage from '../assets/image/sass.png';
import { type CommonPropsType } from '../app/App';
import { PageLayout } from '../layouts/Page.layout';

import { Skill } from './skill/Skill';
import style from './Skills.module.scss';

export const Skills = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(false);

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

	useEffect(() => {
		setTimeout(setIsDisplay, 500, true);
	}, []);

	return (
		<PageLayout isShow={isShow} onClickHandler={onClickHandler}>
			<div className={`${styleContainer.container} ${style.skillsContainer}`}>
				<Title title={'My Skillz'}/>
				{isDisplay && <div className={style.skills}>
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
				</div>}
			</div>
		</PageLayout>
	);
};
