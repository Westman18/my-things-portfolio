import React from 'react';
import classes from './SearchField.module.css'
// import Input from '../Input/Input';
// import MenuButt from '../MenuButt/MenuButt'
// import Logo from '../../Logo/Logo'


const searchField = (props) => {
    return (
        <div className={classes.SearchField}>
                <input onChange={props.searchChanged} placeholder='Search...'></input>
        </div>);
}

export default searchField;