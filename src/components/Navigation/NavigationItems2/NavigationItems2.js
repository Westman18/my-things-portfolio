import React from 'react';
import classes from './NavigationItems2.module.css'
import NavItem from '../NavItem/NavItem'
import NavCategory from '../NavCategory/NavCategory'
import List from '../../../assets/images/List';



const navigationItems2 = (props) => (
    <ul className={classes.NavigationItems2}>
        <div className={classes.Category}>
        <List /><NavCategory>keep organized</NavCategory>
        </div>
        <NavItem link='/home/calendar'>calendar</NavItem>
        <NavItem link='/home/contacts' exact>contacts</NavItem>
        <NavItem link='/home/notes'>notes</NavItem>

    </ul>);

export default navigationItems2;
