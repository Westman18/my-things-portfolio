import React from 'react';
import classes from './UserSettingsSide.module.css'
import NavItem from '../NavItem/NavItem'
import NavCategory from '../NavCategory/NavCategory'
import Settings from '../../../assets/images/Settings';



const userSettingsSide = (props) => (

    <div style={{display:'flex', flexFlow:'column'}}>
        <div className={classes.UserSettingsSide}>
            
                <Settings/><NavCategory>your account</NavCategory>
            
        </div>

        <div className={classes.Links}>
            <NavItem link='/account/profile'>profile</NavItem>
            {/* <NavItem link='/account/bio' exact>bio</NavItem> */}
            <NavItem link='/account/settings'>settings</NavItem>
            <NavItem link='/login' exact><div onClick={props.logout}>log in/out</div></NavItem>

        </div>

    </div>



    // <ul className={classes.NavigationItems}>
    //     <NavCategory>your things</NavCategory>

    //     <NavItem link='/home/dairy'>dairy</NavItem>
    //     <NavItem link='/home/pictures' exact>pictures</NavItem>
    //     <NavItem link='/home/thoughts'>golden thoughts</NavItem>

    // </ul>
);

export default userSettingsSide;
