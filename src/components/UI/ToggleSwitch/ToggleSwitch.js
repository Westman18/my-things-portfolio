import React from 'react';
import classes from './ToggleSwitch.module.css';

const toggleSwitch = (props) => (

    <label className={classes.Switch}>
        <input className={classes.Input} type="checkbox" onChange={props.checked} checked={props.isChecked} />
        <span className={classes.Slider}></span>
    </label>

);

export default toggleSwitch;

