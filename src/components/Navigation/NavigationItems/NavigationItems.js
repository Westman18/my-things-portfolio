import React from 'react';
import classes from './NavigationItems.module.css'
import NavItem from '../NavItem/NavItem'
import NavCategory from '../NavCategory/NavCategory'
import Book from '../../../assets/images/Book';



const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <div className={classes.Category}>
        <Book /><NavCategory>your things</NavCategory>
        </div>
        <NavItem link='/home/diary'>diary</NavItem>
        <NavItem link='/home/pictures' exact>pictures</NavItem>
        <NavItem link='/home/thoughts'>quotes</NavItem>

    </ul>);

export default navigationItems;
