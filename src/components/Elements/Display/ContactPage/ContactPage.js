import React from 'react';
import Female from '../../../../assets/images/Female';
import Group from '../../../../assets/images/Group';
import Male from '../../../../assets/images/Male';
import Other from '../../../../assets/images/Other';
import MenuButt from '../../../UI/MenuButt/MenuButt';
import classes from './ContactPage.module.css';
// import { NavLink } from 'react-router-dom';

const contactPage = (props) => {

    let pic = <Group />;
    if (props.gender === 'male') {
        pic = <Male />
    }

    if (props.gender === 'female') {
        pic = <Female />
    }

    if (props.gender === 'other') {
        pic = <Other />
    }

    return (
        <div className={classes.ContactPage} onClick={props.clicked}>
           

            <div className={classes.Line}>
                {pic}
                <div className={classes.x}>
                    <h3>Name: {props.name}</h3>

                    <h5>Email: {props.email}</h5>
                </div>
                <div className={classes.x}>
                    <h3 style={{color:'brown'}}>Phone number: {props.phoneNumber}</h3>
                    <h5 >Importance: {props.important ? 'vip' : 'normal'}</h5>
                </div>
            </div>

            <div className={classes.TextField}><p>{props.content}</p></div>

            <MenuButt clicked={props.delete}>DELETE</MenuButt>{' '}
            <MenuButt clicked={props.edit}>EDIT</MenuButt>
        </div>)

};

export default contactPage;