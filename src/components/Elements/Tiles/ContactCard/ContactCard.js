import React from 'react';
import Female from '../../../../assets/images/Female';
import Group from '../../../../assets/images/Group';
import Male from '../../../../assets/images/Male';
import classes from './ContactCard.module.css';
import Other from '../../../../assets/images/Other';

// import { NavLink } from 'react-router-dom';

const contactCard = (props) => {

    let trimmedString = props.content.content;
    if (props.content.content.length > 20) {
        trimmedString = trimmedString.substr(0, 20);
        //retrim
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        trimmedString = trimmedString+'...'
    }

    let genderPic = null;

    
    if (props.content.gender === 'male') {
        genderPic = <Male />;
    } else if (props.content.gender === 'female') {
        genderPic = <Female />
    } else if (props.content.gender === 'other') {
        genderPic = <Other />
    } else{
        genderPic = <Group />
    }

    return (

        <div className={classes.ContactCard} onClick={props.clicked}>
            <div className={classes.Content} >
                <div style={{ display: 'flex', width:'90%' }}>
                    {genderPic}
                    <div>
                        <h3>{props.content.name}</h3>
                        <h5>{props.content.phoneNumber}</h5>
                    </div>
                </div>

                <hr style={{ width: '50%', textAlign: 'center', marginLeft: '5' }} />
                <p>{trimmedString}</p>
            </div>
        </div>

    )
};

export default contactCard;