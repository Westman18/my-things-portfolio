import React from 'react';
import Calendar from '../../../../assets/images/Calendar';
import Pin from '../../../../assets/images/Pin';
import MenuButt from '../../../UI/MenuButt/MenuButt';
import classes from './DiaryPage.module.css';
// import { NavLink } from 'react-router-dom';

const diaryPage = (props) => (
    <div className={classes.DiaryPage} onClick={props.clicked}>
        <div className={classes.Line}>
            <div className={classes.Field}><Calendar /><h5>{' '}{props.date}</h5></div>
            <div className={classes.Field}><Pin margin='8px'/> <h5>{' ' + props.location}</h5></div>
        </div>

        <div className={classes.Line}>
            <div className={classes.Field}><h5>{props.title}</h5></div>
            <div className={classes.Field}><h5>It was a {props.emotions} day.</h5></div>
        </div>

        <div className={classes.TextField}><p>{props.content}</p></div>
        
        <MenuButt clicked={props.delete}>DELETE</MenuButt>{' '}
        <MenuButt clicked={props.edit}>EDIT</MenuButt>
    </div>
);

export default diaryPage;