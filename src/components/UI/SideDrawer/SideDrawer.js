import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import UserSettings from '../../Navigation/UserSettings/UserSettings';
import NavigationItems2 from '../../Navigation/NavigationItems2/NavigationItems2';
import UserSettingsSide from '../../Navigation/UserSettingsSide/UserSettingsSide';

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }


    if(props.warmMode){
        attachedClasses.push(classes.Warm) 
    }else{
        attachedClasses.push(classes.Cold) 

    }

    return (

        
            <div className={attachedClasses.join(' ')}>
                <UserSettings logout={props.logout}/>
                <NavigationItems/>
                <NavigationItems2/>
                <UserSettingsSide logout={props.logout}/>
            </div>
       
    )
}

export default SideDrawer;