import React from 'react';

import style from './Title.module.scss';

interface TitlePropsType {
	title: string
}

export const Title = (props: TitlePropsType) => {
	return (
		<div className={style.title}>
			<h2>{props.title}</h2>
			<div className={style.strip} />
		</div>
	);
};
