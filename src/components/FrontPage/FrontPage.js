import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './FrontPage.module.css'

const frontPage = (props) => {

    let headClasses =[classes.Head, classes.HeadShow];
    let underHeadClasses =[classes.UnderHead, classes.UnderHeadShow];
    let ButtonClasses =[classes.Button, classes.ButtonShow];
    if (props.continue) {
        headClasses =[classes.Head, classes.HeadHide];
        underHeadClasses =[classes.UnderHead, classes.UnderHeadHide];
        ButtonClasses =[classes.Button, classes.ButtonHide];
    }
    return (
        <div className={classes.FrontPage} onClick={props.clicked}>
            <h1 className={headClasses.join(' ')}>myThings</h1>
            <h4 className={underHeadClasses.join(' ')}>Reactive app by Piotr J.</h4>
            <button className={ButtonClasses.join(' ')} onClick={props.clicked}>{'> '}click to continue{' <'}</button>
        </div>)
};

export default frontPage;