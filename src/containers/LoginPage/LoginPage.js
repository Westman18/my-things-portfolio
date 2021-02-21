import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/MenuButt/MenuButt';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input';
import MenuButt from "../../components/UI/MenuButt/MenuButt";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from '../../store/actions/index'

import classes from './LoginPage.module.css';
import axios from '../../axios-base';

class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.initialState = {
            inputForm: {
                emailAddress: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'input',
                        placeholder: 'E-mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },

                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
            loading: false,
        }
        this.state = this.initialState;
    }

    checkValidity(value, rules) {
        let isValid = true;//logic to keep truth \/

        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;//checking if it isn't empty, trim to delete whitespaces
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength; //add more rule handlers
        }

        if (rules.isEmail && isValid) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value.toLowerCase());
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value)
        const updatedinputForm = {
            ...this.state.inputForm //doesn't create a deep copy!!
            //this way only one level copy comes out
        };

        const updatedFormElement = {
            ...updatedinputForm[inputIdentifier]//copying the single element that i care of - 2nd level copy
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedinputForm[inputIdentifier] = updatedFormElement;

        //checking the whole form validity every time
        let formIsValid = true;
        for (let inputIdentifier in updatedinputForm) {
            formIsValid = updatedinputForm[inputIdentifier].valid && formIsValid //a tail, backcheck
        }


        this.setState({ inputForm: updatedinputForm, formIsValid: formIsValid })//putting the whole obj to merge with state

    }

    submitHandler = () => {
        this.props.onAuth(this.state.inputForm.emailAddress.value, this.state.inputForm.password.value, 'login');
    }

    demoLogin = () => {
        this.props.onAuth('guest@guest.guest', 'guestguest', 'login');
    }

    render() {
        const formEls = { ...this.state.inputForm };

        let form = (

            <form onSubmit={this.postHandler}>

                <Input
                    key={'emailAddress'}
                    elementType={formEls.emailAddress.elementType}
                    elementConfig={formEls.emailAddress.elementConfig}
                    value={formEls.emailAddress.value}
                    invalid={!formEls.emailAddress.valid}
                    shouldValidate={formEls.emailAddress.validation.required}
                    touched={formEls.emailAddress.touched}
                    changed={(event) => this.inputChangedHandler(event, 'emailAddress')} />

                <Input
                    key={'password'}
                    elementType={formEls.password.elementType}
                    elementConfig={formEls.password.elementConfig}
                    value={formEls.password.value}
                    invalid={!formEls.password.valid}
                    shouldValidate={formEls.password.validation.required}
                    touched={formEls.password.touched}
                    changed={(event) => this.inputChangedHandler(event, 'password')} />
                {/* <p style={{marginTop:0}}>(min. 5 characters)</p> */}
            </form>);

        if (this.props.loading) {
            form = <Spinner />
        }

        let message = null;

        if (this.props.error) {
            message = (
                <p>{this.props.error.message}</p>//error that came from the firebase
            );

            if (this.props.error.message = 'EMAIL_NOT_FOUND') {
                message = (
                    <p> No such email registred! </p>)
            }

        }

        let topMessage = null;
        //>>
        if (!this.props.token && this.props.wasLogout) {
            topMessage = (
                <div className={classes.LoginPage}>
                    <h3 style={{margin:0,marginTop:'6px'}}>You logged out successfully!</h3></div>
            )
        }

        if (!this.props.token && this.props.justRegistered) {
            topMessage = (
                <div className={classes.LoginPage}>
                    <h3 style={{margin:0,marginTop:'6px'}}>Welcome to my app! You can now log in.</h3></div>
            )
        }



        let loginOrLogged = (
            <Fragment>
                {topMessage}
                <div className={classes.LoginPage}>
                    <h4>Input your email and password:</h4>
                    {message}
                    {form}

                    <div>
                        <Button clicked={this.submitHandler}
                            disabled={!this.state.formIsValid}>
                            LOGIN</Button>
                        {/* {' '} <Button clicked={this.props.cancel} CANCEL</Button> */}
                    </div>

                </div>

                <div className={classes.LoginPage}>
                    <h5>No account yet?</h5>
                    <p>Register in my webApp to test the whole functionality on your own !</p>
                    <p>No real e-mail adress is reqiured.</p>
                     <MenuButt>
                        <NavLink
                            activeStyle={{
                                // fontWeight: "500",
                                textDecoration: 'none',
                                color: 'black'
                            }}
                            style={{
                                fontSize: "17px",
                                textDecoration: 'none',
                                color: 'darkblue'
                            }}
                            to={'/register'}
                            exact
                            activeClassName={classes.active}>
                            REGISTER
                        </NavLink>
                    </MenuButt> 

                    <h4>Or check the demo account:</h4>
                    {'>'} <MenuButt clicked={this.demoLogin}>
                        <div style={{color:'darkblue',fontSize: "17px"}}>DEMO</div>
                    </MenuButt> {'<'}
                </div>
            </Fragment>)

            //When already logged:

            if(this.props.token) {
                loginOrLogged = (<div className={classes.LoginPage}>
                    <h4>You are logged in as <u>{this.props.userName}</u>.
                     Open 
                     <div style={{display:'inline', cursor:'pointer'}} onClick={this.props.showMenu}> <u>MENU</u> </div> 
                     and start exploring...</h4>
                     {this.props.isDemo? <h4 style={{color:'blue', fontFamily:'monospace'}}>Note: In demo mode you can't edit any contents</h4>:null}
                </div>)
            }

        return loginOrLogged
    }
}

const mapStateToProps = state => {
    return {

        token: state.auth.token,
        userName: state.auth.userName,
        loading: state.auth.loading, //navigating to the correct reducer
        error: state.auth.error,
        wasLogout: state.auth.wasLogout,
        justRegistered: state.auth.justRegistered,
        isDemo: state.auth.isDemo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, loginOrRegister) => dispatch(actions.auth(email, password, loginOrRegister)),
        showMenu: () => dispatch(actions.showMenu())
    }//dispath jest takim triggerem konkretnych zaimportowanych akcji

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);