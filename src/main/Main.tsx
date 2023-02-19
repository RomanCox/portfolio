import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TypingText } from '../hooks/TypingText/TypingText';
import { Canvas } from '../common/components/Background/Canvas';
import { Header } from '../header/Header';
import { type CommonPropsType } from '../app/App';

import style from './Main.module.scss';

export const Main = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(true);
	const [isPlay, setIsPlay] = useState<boolean>(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const togglePlay = useCallback(() => {
		if (!isPlay) {
			videoRef.current?.play();
			setIsPlay(true);
		} else {
			videoRef.current?.pause();
			setIsPlay(false);
		}
	}, [isPlay]);

	const phrases = ['', 'front-end developer', 'web developer', 'freelancer'];

	useEffect(() => {
		if (!isShow) {
			setTimeout(setIsDisplay, 250, false);
		} else {
			setIsDisplay(true);
		}
	}, [isShow]);

	return (
		<div className={style.body}>
			{isDisplay && <Header
				onClickHandler={onClickHandler}
				isShow={isShow}
				isPlay={isPlay}
				togglePlay={togglePlay}
			/>}
			<Canvas color={'green'}/>
			<section className={style.mainBlock}>
				{isShow
					? <div className={style.container}>
						<div className={style.center}>
							<div className={style.textContainer}>
								<h1 className={style.selection}>Roman Cox</h1>
								<h4>{'I\'m a'}
									<div className={style.typingTextContainer}>
										<TypingText phrases={phrases}/>
									</div>
								</h4>
							</div>
						</div>
					</div>
					: null
				}
				{/*	{isShow */}
				{/*		?	<div className={style.center}> */}
				{/*				{isNameShow && <div className={style.textContainer}> */}
				{/*					<span className={style.title}>my name: </span> */}
				{/*					<TypeIt */}
				{/*						className={style.typingText} */}
				{/*						as={'span'} */}
				{/*						options={options} */}
				{/*						getBeforeInit={instance => { */}
				{/*							instance.pause(250).type('Roman Cxo').pause(500).delete(2).type('ox') */}

				{/*							return instance */}
				{/*						}} */}
				{/*					/> */}
				{/*				</div>} */}
				{/*				{isDescriptionShow && <div className={style.textContainer}> */}
				{/*					<div className={style.title}>I am: </div> */}
				{/*				</div>} */}
				{/*			</div> */}
				{/*		: null */}
				{/* } */}
			</section>
		</div>

	);
};
