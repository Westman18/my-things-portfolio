import React, { Component, Fragment } from 'react';
import classes from './UserSettings.module.css'
import NavItem from '../NavItem/NavItem'
import NavCategory from '../NavCategory/NavCategory'
import { NavLink } from 'react-router-dom';
import User from '../../../assets/images/User';
import { connect } from 'react-redux';


class UserSettings extends Component {

    render() {
        return (
            <div style={{ display: 'flex', flexFlow: 'column' }}>
                <div className={classes.UserSettings}>

                    <NavLink to='/account'>
                        <User />
                    </NavLink>

                    <NavLink to='/account' style={{ textDecoration: 'none', color: "darkblue" }}>
                        <NavCategory>{this.props.user?this.props.user:'logged out'}</NavCategory>
                    </NavLink>
                </div>

                <div className={classes.Links}>
                    <NavItem link='/account/profile'>profile</NavItem>
                    <NavItem link='/account/settings'>settings</NavItem>
                    <NavItem link='/login' exact><div onClick={this.props.logout}>logout</div></NavItem>


                </div>

            </div>

        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.userName
    };
}

export default connect(mapStateToProps)(UserSettings);
