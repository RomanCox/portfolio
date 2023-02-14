import React from 'react';
import style from './Footer.module.scss';

export const Footer = () => {
    return (
        <div className={style.footer}>
            <h4>Roman Cox</h4>
            <div className={style.footerSocialContainer}>
                <div className={style.footerSocial}></div>
                <div className={style.footerSocial}></div>
                <div className={style.footerSocial}></div>
                <div className={style.footerSocial}></div>
            </div>
            <span className={style.description}>Copyright © 2021. All rights reserved.</span>
            <span className={style.description}>Designed & Developed by {<a className={style.link} href={'https://romancox.github.io/'} target={'_blank'}>Roman Cox</a>}</span>

        </div>
);
}
