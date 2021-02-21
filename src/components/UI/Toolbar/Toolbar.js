import React from 'react';
import classes from './Toolbar.module.css'
import MenuButt from '../MenuButt/MenuButt'
import Logo from '../../Logo/Logo'
import { NavLink } from 'react-router-dom'
import MenuButton from '../MenuButton/MenuButton';

const toolbar = (props) => {
    // <div className={classes.Wrap}>


    let attachedClasses = [classes.Toolbar, classes.Cold]

    if (props.warmMode) {
        attachedClasses = [classes.Toolbar, classes.Warm]
    }

    return (

        <header className={attachedClasses.join(' ')}>

            <MenuButton clicked={props.handleMenu}>MENU</MenuButton>
            <Logo />
            <div style={{ height: '100%' }}>

                {props.isAuth ?
                    <NavLink
                        activeStyle={{
                            // fontWeight: "500",
                            margin: 0,
                            padding: 0
                        }}
                        style={{
                            // fontWeight: "300",
                            margin: 0,
                            padding: 0

                        }}
                        to={'/login'}
                        exact
                        activeClassName={classes.active}>
                        <MenuButt clicked={props.onLogout}>
                            LOGOUT </MenuButt>
                    </NavLink>
                    :

                    <NavLink
                        activeStyle={{
                            // fontWeight: "500",
                            margin: 0,
                            padding: 0
                        }}
                        style={{
                            // fontWeight: "300",
                            margin: 0,
                            padding: 0

                        }}
                        to={'/login'}
                        exact
                        activeClassName={classes.active}>
                        <MenuButt>
                            LOGIN
                            </MenuButt>
                    </NavLink>

                }


                {' '}
                    <MenuButt blink clicked={props.handleInfo}>&#8505; INFO</MenuButt>
                

            </div>
        </header>
        // </div>

    )
}

export default toolbar;