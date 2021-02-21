import React from 'react';
import classes from './MenuButt.module.css';

const menuButt = (props) =>{

let attachedClasses = [classes.MenuButt]

if(props.blink){
    attachedClasses.push(classes.Blink)
}
return(
    <button
        className={attachedClasses.join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>
        {props.children}
    </button>
);
}
export default menuButt;