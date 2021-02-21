import React from 'react';
import MenuButt from '../../../UI/MenuButt/MenuButt';
import classes from './GoldenThought.module.css';
// import { NavLink } from 'react-router-dom';

const goldenThought = (props) => (

    <div className={classes.GoldenThought} onClick={props.clicked}>
        <h5>{props.title}</h5>
        <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5' }} />
        <p>{props.content}</p>
        <div className={classes.Line}>
        <MenuButt clicked={props.delete}>DELETE</MenuButt>
        <MenuButt clicked={props.edit}>EDIT</MenuButt>
        </div>
        
    </div>
);

export default goldenThought;