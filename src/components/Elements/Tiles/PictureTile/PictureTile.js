import React from 'react';
import BaseTile from '../BaseTile/BaseTile';
import classes from './PictureTile.module.css';

const pictureTile = (props) => (
    <BaseTile background={props.background} clicked={props.clicked} pictureTile={props.content.tileLink}>
        
        <div className={classes.PictureTile}
            onClick={props.clicked}>
            <h3>{props.content.title}</h3>
            <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5' }} />
           
        </div>
        
    </BaseTile>

);

export default pictureTile;