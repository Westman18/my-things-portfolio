import React, { Fragment } from 'react';
import classes from './SearchFilter.module.css'
import Input from '../Input/Input';
// import MenuButt from '../MenuButt/MenuButt'
// import Logo from '../../Logo/Logo'


const searchFilter = (props) => {
    return (
        <div className={classes.SearchFilter}>



            <div className={classes.Search}>
                <input onChange={props.searchChanged} placeholder='Search...'></input>
            </div>

            {props.barType === 'diary' ?
                <Fragment>
                    <div className={classes.Filter}>
                        Sort by:
                    <select onChange={props.sortingChanged}>
                            <option value='date'>Date</option>
                            <option value='title'>Title</option>
                        </select>
                    </div>
                    <div className={classes.Filter}>
                        Show
                        <select onChange={props.emotionChanged}>
                            <option value='all'>all</option>
                            <option value='good'>good</option>
                            <option value='normal'>normal</option>
                            <option value='bad'>bad</option>
                        </select> days.
                    </div>
                </Fragment>
                : null}

            {props.barType === 'calendar' ? <div className={classes.Filter}>
                Show:
            <select onChange={props.importanceChanged}>
                    <option value='all'>all</option>
                    <option value='important'>impotrant</option>
                </select>
            </div>
                : null}
        </div>);
}


export default searchFilter;