import React from 'react';
import classes from './BaseTile.module.css';
// import { NavLink } from 'react-router-dom';

const baseTile = (props) => {


    

    let attachedClasses = [classes.Content, props.background];
        // attachedClasses.concat(props.background);


    let pictureBackgroundStyle = {}
    if (props.pictureTile) {
        attachedClasses = [classes.Content]

        pictureBackgroundStyle = {
            background: 'url(' + props.pictureTile + ')',
            backgroundSize: 'cover'
        }
    }

    return (
        <div className={classes.BaseTile}
            onClick={props.clicked}
        >
            <div className={attachedClasses.join(' ')}
                style={pictureBackgroundStyle}>
                
                {props.children}
            </div>
        </div>)
};

export default baseTile;