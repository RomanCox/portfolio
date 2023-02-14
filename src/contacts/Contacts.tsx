import React from 'react';
import style from './Contacts.module.scss';
import styleContainer from '../common/styles/Container.module.scss';
import {Title} from '../common/components/Title/Title';
import {InputText} from '../common/components/Inputs/InputText';
import {Textarea} from '../common/components/Inputs/Textarea';
import {Button} from '../common/components/Button/Button';
import {PATH} from "../app/App";
import styleCloseButton from "../common/styles/CloseButton.module.scss";
import {NavLink} from "react-router-dom";

export const Contacts = () => {

    let shortInput = {
        input: {width: '190px',},
        bar: {width: '200px'},
    }

    let longInput = {
        input: {width: '430px'},
        bar: {width: '450px'},
    }

    return (
        <div className={style.contactsBlock}>
            <NavLink to={PATH.MAIN} className={styleCloseButton.buttonContainer}>
                <div className={styleCloseButton.button} />
            </NavLink>
            <div className={`${styleContainer.container} ${style.contactsContainer}`}>
                <Title title={'Get in Touch'}/>
                <div className={style.contactInfo}>
                    <div className={style.formContainer}>
                        <h3>Message Me</h3>
                        <form className={style.contactForm}>
                            <div className={style.formContactBlock}>
                                <div className={style.shortInputContainer}>
                                    <InputText placeholder={'Name'} style={shortInput}/>
                                </div>
                                <div className={style.shortInputContainer}>
                                    <InputText placeholder={'Email'} style={shortInput}/>
                                </div>
                            </div>
                            <div className={style.formMessageBlock}>
                                <InputText placeholder={'Subject'} style={longInput}/>
                                <Textarea placeholder={'Message'} rows={5} wrap={'soft'}/>
                            </div>
                            <div className={style.formButtonContainer}>
                                <Button type='submit' title={'Send message'} />
                            </div>
                        </form>
                    </div>
                    <div className={style.contactContainer}>
                        <h3>Contact Info</h3>
                        <span className={style.preContacts}>Always available for freelance work if the right project comes
                            along, Feel free to contact me!</span>
                        <ul className={style.list}>
                            <li>
                                <div className={style.liStyleContainer}>
                                    <div className={style.iconContainer}>
                                        <span className={style.iconUser}></span>
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
                                        <span className={style.iconLocation}></span>
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
                                        <span className={`${style.iconMessenger} ${style.iconMessenger}`}></span>
                                    </div>
                                    <div className={style.nameContainer}>
                                        <h6 className={style.nameTitle}>Message / Call Me</h6>
                                        <span className={style.name}>
                                            <a
                                                href='https://t.me/romancox'
                                                className={style.link}
                                                target={'_blank'}
                                                title='Telegram Messenger'
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
                                            >RomanCox</a>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
