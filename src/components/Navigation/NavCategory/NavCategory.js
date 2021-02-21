import React from 'react';
import classes from './NavCategory.module.css';
// import { NavLink } from 'react-router-dom';

const navCategory = (props) => (
    <li className={classes.NavCategory}>
        {props.children}
    </li>
);

export default navCategory;