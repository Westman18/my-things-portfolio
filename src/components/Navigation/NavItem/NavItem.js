import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const navItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink
            activeStyle={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "darkblue"
            }}
            style={{
                fontWeight: "300",
                textDecoration: "none",
                color: "black"
            }}
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

export default navItem;