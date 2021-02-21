import React from 'react';
import BaseTile from '../BaseTile/BaseTile';
import classes from './ThoughtTile.module.css';



const thoughtTile = (props) => {
    let trimmedString = props.content.content;
    if (props.content.content.length > 70) {
        trimmedString = trimmedString.substr(0, 80);
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        trimmedString=trimmedString+'...'
    }
    return (
        <BaseTile background={props.background} clicked={props.clicked}>
            <div className={classes.ThoughtTile} onClick={props.clicked}>
                <h3>{props.content.title}</h3>
                <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5' }} />
                <p>{trimmedString}</p>
            </div>
        </BaseTile>
    )
};

export default thoughtTile;