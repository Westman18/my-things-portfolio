import React from 'react';
import BaseTile from '../BaseTile/BaseTile';
import classes from './DiaryTile.module.css';
// import { NavLink } from 'react-router-dom';

const diaryTile = (props) => {

    let trimmedString = props.content.content;
    if (props.content.content.length > 80) {
        trimmedString = trimmedString.substr(0, 80);
        //retrim
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        trimmedString=trimmedString+'...'
    }

    let trimmedTitle = props.content.title;
    if (props.content.title.length > 16) {
        trimmedTitle = trimmedTitle.substr(0, 15);
        //retrim
        trimmedTitle = trimmedTitle.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        trimmedTitle=trimmedTitle+'...'
    }

    return (

        <BaseTile background = {props.background} clicked={props.clicked}>
            <div className={classes.DiaryTile} >
                <h5>{props.content.date}</h5>
                <h3>{trimmedTitle}</h3>
                <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5' }} />
                <p>{trimmedString}</p>
            </div>
        </BaseTile>

    )
};

export default diaryTile;