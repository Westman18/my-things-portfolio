import React from 'react';
import classes from './NewStrap.module.css';

const newStrap = (props) => (

    <div className={classes.Base} onClick={props.clicked}>
        <div onClick={props.clicked} className={classes.NewStrap}>

            <h2>+</h2>
            <h3>new</h3>

        </div>
    </div>

);

export default newStrap;