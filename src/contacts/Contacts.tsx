import React, { useEffect, useState } from 'react';

import styleContainer from '../common/styles/Container.module.scss';
import { Title } from '../common/components/Title/Title';
import { InputText } from '../common/components/Inputs/InputText';
import { Textarea } from '../common/components/Inputs/Textarea';
import { Button } from '../common/components/Button/Button';
import { type CommonPropsType } from '../app/App';
import { PageLayout } from '../layouts/Page.layout';

import style from './Contacts.module.scss';

export const Contacts = ({ onClickHandler, isShow }: CommonPropsType) => {
	const [isDisplay, setIsDisplay] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(setIsDisplay, 500, true);
	}, []);

	return (
		<PageLayout isShow={isShow} onClickHandler={onClickHandler}>
			<div className={`${styleContainer.container} ${style.contactsContainer}`}>
				<Title title={'Get in Touch'}/>
				{isDisplay && <div className={style.contactInfo}>
					<div className={style.formContainer}>
						<h3>Message Me</h3>
						<form className={style.contactForm}>
							<div className={style.formContactBlock}>
								<div className={style.shortInputContainer}>
									<InputText placeholder={'Name'} />
								</div>
								<div className={style.shortInputContainer}>
									<InputText placeholder={'Email'} />
								</div>
							</div>
							<div className={style.formMessageBlock}>
								<div className={style.longInputContainer}>
									<InputText placeholder={'Subject'} />
								</div>
								<div className={style.textAreaContainer}>
									<Textarea placeholder={'Message'} rows={5} wrap={'soft'}/>
								</div>
							</div>
							<div className={style.formButtonContainer}>
								<Button type='submit' title={'Send message'} />
							</div>
						</form>
					</div>
					<div className={style.contactContainer}>
						<h3>Contact Info</h3>
						<span className={style.preContacts}>
							Always available for freelance work if the right project comes along,
							Feel free to contact me!
						</span>
						<ul className={style.list}>
							<li>
								<div className={style.liStyleContainer}>
									<div className={style.iconContainer}>
										<span className={style.iconUser}/>
									</div>
									<div className={style.nameContainer}>
										<h6 className={style.nameTitle}>Name</h6>
										<span className={style.name}>Roman Cox</span>
									</div>
								</div>
							</li>
							<li>
								<div className={style.liStyleContainer}>
									<div className={style.iconContainer}>
										<span className={style.iconLocation}/>
									</div>
									<div className={style.nameContainer}>
										<h6 className={style.nameTitle}>Location</h6>
										<span className={style.name}>Minsk, Belarus</span>
									</div>
								</div>
							</li>
							<li>
								<div className={style.liStyleContainer}>
									<div className={style.iconContainer}>
										<span className={style.iconMessenger}/>
									</div>
									<div className={style.nameContainer}>
										<h6 className={style.nameTitle}>Message / Call Me</h6>
										<span className={style.name}>
											<a
												href='https://t.me/romancox'
												className={style.link}
												target={'_blank'}
												title='Telegram Messenger'
												rel={'nofollow noreferrer'}
											>@romancox</a>
										</span>
									</div>
								</div>
							</li>
							<li>
								<div className={style.liStyleContainer}>
									<div className={style.iconContainer}>
										<span className={style.iconGit}></span>
									</div>
									<div className={style.nameContainer}>
										<h6 className={style.nameTitle}>My GitHub</h6>
										<span className={style.name}>
											<a
												href='https://github.com/RomanCox'
												className={style.link}
												target={'_blank'}
												title='GitHub'
												rel={'nofollow noreferrer'}
											>RomanCox</a>
										</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>}
			</div>
		</PageLayout>
	);
};
