import React from 'react';
import classes from './CalendarStrap.module.css';
// import { NavLink } from 'react-router-dom';
import Pin from '../../../../assets/images/Pin';
import Exclamation from '../../../../assets/images/Exclamation';

const calendarStrap = (props) => {

    let trimmedString = props.content.content;
    if (props.content.content.length > 80) {
        trimmedString = trimmedString.substr(0, 80);
        //retrim
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        trimmedString = trimmedString+'...'
    }

    return (

        <div className={classes.CalendarStrap} onClick={props.clicked}>
            <div className={classes.Content} >
                <div className={classes.Line}>
                    
                    
                    <div className={classes.Field}><h3 >{props.content.title}</h3></div>

                    <div className={classes.Field} style={{width:'60%', justifyContent:'center'}}><h4>{props.content.time}</h4></div>
                    
                    <div className={classes.Field}><Pin margin='10px' /><h3>{props.content.location}</h3></div>
                </div>

                <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5', backgroundColor:'garkgray', height:'1px' }} />
                
                <div className={classes.Line}>
                    <p>{trimmedString}</p>
                    {props.content.important? <Exclamation/>:null}
                </div>


            </div>
        </div>

    )
};

export default calendarStrap;