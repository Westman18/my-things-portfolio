import React from 'react';
import classes from './MenuButton.module.css';

const menuButton = (props) => (
    <button
        className={classes.MenuButton}
        onClick={props.clicked}>
        <div className={classes.Strap}/>
        <div className={classes.Strap}/>
        <div className={classes.Strap}/>
    </button>
);

export default menuButton;