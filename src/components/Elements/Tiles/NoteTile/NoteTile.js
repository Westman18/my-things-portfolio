import React from 'react';
import BaseTile from '../BaseTile/BaseTile';
import classes from './NoteTile.module.css';

const noteTile = (props) => {
    let trimmedString = props.content.content;
    if (props.content.content.length > 70) {
        trimmedString = trimmedString.substr(0, 70);
        //retrim
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        trimmedString = trimmedString + '...'
    }
    return (
        <BaseTile background={props.background} clicked={props.clicked}>
            <div className={classes.NoteTile} onClick={props.clicked}>
                <h3>{props.content.title}</h3>
                <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5' }} />
                <p>{trimmedString}</p>
            </div>
        </BaseTile>
    )


};

export default noteTile;