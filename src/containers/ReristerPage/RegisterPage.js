import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/MenuButt/MenuButt';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input';
import MenuButt from "../../components/UI/MenuButt/MenuButt";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from '../../store/actions/index'

import classes from './RegisterPage.module.css';
import axios from '../../axios-base';

class RegisterPage extends Component {

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
        this.props.onAuth(this.state.inputForm.emailAddress.value, this.state.inputForm.password.value, 'register');


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
        return (

            <Fragment>
                <div className={classes.RegisterPage}>
                    <h5 style={{ marginTop: '9px' }}>Wecome to the registration page!</h5>

                </div>
                <div className={classes.RegisterPage}>
                    <h5>Please input an email and choose your password:</h5>
                    {form}

                    <div>
                        <MenuButt clicked={this.submitHandler}
                            disabled={!this.state.formIsValid}>
                            <NavLink
                                activeStyle={{
                                    // fontWeight: "500",
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                                style={{
                                    // fontWeight: "300",
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                                to={'/login'}
                                exact
                                activeClassName={classes.active}>
                                REGISTER
                            </NavLink>
                        </MenuButt>
                        {/* {' '}
                        <Button clicked={this.props.cancel}>
                            CANCEL</Button> */}
                    </div>

                </div>

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading //navigating to the correct reducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, loginOrRegister) => dispatch(actions.auth(email, password, loginOrRegister))
    }//dispath jest takim triggerem konkretnych zaimportowanych akcji
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);