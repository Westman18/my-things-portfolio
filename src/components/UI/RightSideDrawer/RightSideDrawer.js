import React, { Fragment } from 'react';
import classes from './RightSideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const RightSideDrawer = (props) => {

    let attachedClasses = [classes.RightSideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.RightSideDrawer, classes.Open]
    }

    return (

        <Fragment>
            <Backdrop show={props.open} clicked={props.hide}/>
            <div className={attachedClasses.join(' ')}>
                <h2>Welcome to my app!</h2>
                <h4>My name is Piortr Jarosz and I'm into web development for almost a year now. </h4>
                <h4>This is my portfolio, sample app. I will update and debug it if necessary.</h4>
                <h3>Check out the source code:</h3>
                <h3>See my LikedIn profile:</h3>
                <a  style={{textDecoration:'none',fontWeight:'bold'}}href="https://www.linkedin.com/in/piotr-jarosz-730187172/">https://www.linkedin.com/in/piotr-jarosz-730187172/</a>
                <h3>Download my CV in PDF format:</h3>
                <a  style={{textDecoration:'none',fontWeight:'bold'}}href="https://drive.google.com/file/d/122_VzY3bvkERlhYCr_3ddMxilr24NIwG/view">https://drive.google.com/file/d/122_VzY3bvkERlhYCr_3ddMxilr24NIwG/view</a>

                
            </div>
        </Fragment>
    )
}

export default RightSideDrawer;