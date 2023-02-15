import React, {ReactNode} from 'react';
import {ButtonStyled, CloseButtonStyled, PageLayoutStyled} from './Page.layout.styled';
import {CommonPropsType} from "../app/App";
import {useNavigate} from "react-router-dom";

type PageLayoutPropsType = CommonPropsType & {
    children: ReactNode,
}
export const PageLayout = ({children, onClickHandler, isShow}: PageLayoutPropsType) => {
    const navigate = useNavigate();

    const closeHandler = () => {
        onClickHandler()
        setTimeout(navigate, 400, '/')
    }

    return (
        <PageLayoutStyled isShow={isShow}>
            <CloseButtonStyled>
                <ButtonStyled onClick={closeHandler}/>
            </CloseButtonStyled>
            {/*<div className={styleCloseButton.buttonContainer}>*/}
            {/*    */}
            {/*</div>*/}
            {children}
        </PageLayoutStyled>
    )
}