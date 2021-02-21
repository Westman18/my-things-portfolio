import React from 'react';
import classes from './Picture.module.css';

import MenuButt from '../../../UI/MenuButt/MenuButt';
import Pin from '../../../../assets/images/Pin'
import Calendar from '../../../../assets/images/Calendar';


const picture = (props) => (
    <div className={classes.Picture} onClick={props.clicked}>
        <div className={classes.Line}>
            <div className={classes.Field}><Calendar /><h5>{' '}{props.date}</h5></div>
            <div className={classes.Field}><Pin margin='8px' /> <h5>{' ' + props.location}</h5></div>
        </div>

        <div className={classes.Line}>
            <div className={classes.Field}><h5>{props.title}</h5></div>
            <div className={classes.Field}><h5>It's a {props.emotions} pic.</h5></div>
        </div>

        <img className={classes.Image} src={props.pictureLink} />
        <MenuButt clicked={props.delete}>DELETE</MenuButt>
        {' '}
        <MenuButt clicked={props.edit}>EDIT</MenuButt>
    </div>
);

export default picture;