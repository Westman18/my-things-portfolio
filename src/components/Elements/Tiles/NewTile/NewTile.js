import React from 'react';
import BaseTile from '../BaseTile/BaseTile';
import classes from './NewTile.module.css';
// import { NavLink } from 'react-router-dom';

const newTile = (props) => {

    let lighterBackground = [ classes.Opacity, props.background]


    return(
    <BaseTile clicked={props.clicked} background={lighterBackground.join(' ')} >
        <div onClick={props.clicked} className={classes.NewTile} >
            <h1>+</h1>
            <h3>new</h3>
        </div>
    </BaseTile>)

    

};

export default newTile;