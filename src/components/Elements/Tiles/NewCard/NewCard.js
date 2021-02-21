import React from 'react';
// import BaseTile from '../BaseTile/BaseTile';
import classes from './NewCard.module.css';
// import { NavLink } from 'react-router-dom';

const newCard = (props) => (

    <div className={classes.NewCard} onClick={props.clicked}>
        <div className={classes.Content}>
            <h1>+</h1>
            <h3>new</h3>
        </div>
    </div>

);

export default newCard;