import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index'
import classes from './SettingsPage.module.css';
import axios from '../../axios-base';
import ToggleSwitch from '../../components/UI/ToggleSwitch/ToggleSwitch';

import Button from '../../components/UI/MenuButt/MenuButt';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input';
import MenuButt from "../../components/UI/MenuButt/MenuButt";


class SettingsPage extends Component {

    constructor(props) {
        super(props)
        this.initialState = {

            inputForm: {
                password: {
                    name: 'password',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'New password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                },
                passwordConfirm: {
                    name: 'passwordConfirm',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Repeat new password'
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
            notMatching: null,
            error: null,
            successMessage: '',
            deletedMessage: ''
        }
        this.state = this.initialState;
    }

    checkValidity(value, rules, name) {

        console.log(name)

        console.log(this.state.inputForm.passwordConfirm.value)
        console.log(value)

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

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedinputForm = {
            ...this.state.inputForm //doesn't create a deep copy!!
        };

        const updatedFormElement = {
            ...updatedinputForm[inputIdentifier]//copying the single element that i care of - 2nd level copy
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, updatedFormElement.name)
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
        if (this.state.inputForm.password.value !== this.state.inputForm.passwordConfirm.value) {
            this.setState({ notMatching: true })
            return
        }

        this.setState({ error: null, successMessage: '' });

        let updateURL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSV8DS-wVajKzMhnSSprjp-cePBXEnNkI';

        const authData = {
            idToken: this.props.token,
            password: this.state.inputForm.password.value,
            returnSecureToken: false
        };

        axios.post(updateURL, authData)
            .then(res => {
                console.log(res);
                this.setState({ successMessage: 'Password changed!' });

            }).catch(err => {
                console.log('error', err.response.data.error);
                this.setState({ error: err.response.data.error });
            })

    }

    deleteAccountHandler = () => {


        if(this.props.isDemo){
            window.alert('This is demo version!')
            return
        }
        if (!window.confirm('Are you sure to delete this account permanently?')) {
            return
        }

        

        let updateURL = 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBSV8DS-wVajKzMhnSSprjp-cePBXEnNkI';

        const authData = {
            idToken: this.props.token,
        };

        axios.post(updateURL, authData)
            .then(res => {
                console.log(res);
                this.setState({ deletedMessage: 'Account deleted!' });
                this.props.wipeData(null, null, null)

            }).catch(err => {
                console.log('error', err.response.data.error);
                this.setState({ error: err.response.data.error });
            })

    }

    colorHandler = (event) => {
        this.props.warmMode(event.target.checked)
    }

    render() {
        const formEls = { ...this.state.inputForm };

        let form = (

            <form onSubmit={this.postHandler}>

                <Input
                    key={'password'}
                    elementType={formEls.password.elementType}
                    elementConfig={formEls.password.elementConfig}
                    value={formEls.password.value}
                    invalid={!formEls.password.valid}
                    shouldValidate={formEls.password.validation.required}
                    touched={formEls.password.touched}
                    changed={(event) => this.inputChangedHandler(event, 'password')} />

                <Input
                    key={'passwordConfirm'}
                    elementType={formEls.passwordConfirm.elementType}
                    elementConfig={formEls.passwordConfirm.elementConfig}
                    value={formEls.passwordConfirm.value}
                    invalid={!formEls.passwordConfirm.valid}
                    shouldValidate={formEls.passwordConfirm.validation.required}
                    touched={formEls.passwordConfirm.touched}
                    changed={(event) => this.inputChangedHandler(event, 'passwordConfirm')} />
            </form>);

        if (this.props.loading) {
            form = <Spinner />
        }

        let message = null;

        if (this.state.error) {
            message = (
                <p>Error!</p>//error that came from the firebase
            );

        }
        if (this.state.successMessage !== '') {
            message = (
                <p>{this.state.successMessage}</p>
            )
        };




        let loginOrLogged = (
            <Fragment>
                <div className={classes.SettingsPage}>
                    <h5 style={{ margin: 0, marginTop: '6px' }}>
                        Warm colors
                        <ToggleSwitch
                            isChecked={this.props.isWarmMode}
                            checked={(event) => this.colorHandler(event)} />
                    </h5>
                </div>

                <div className={classes.SettingsPage}>
                    <h5>Change password:</h5>
                    <h6 style={{ margin: '0' }}>(min. 5 characters)</h6>
                    {this.state.notMatching ?
                        <h6 style={{ margin: '0', color: 'red', fontWeight: 'bold' }}>Passwords are different!</h6> : null}
                    {message}
                    {form}

                    <div>
                        <Button clicked={this.submitHandler}
                            disabled={!this.state.formIsValid || this.props.isDemo}>
                            CHANGE</Button>
                    </div>

                </div>


                <div className={classes.SettingsPage}>
                    <h5>Delete account</h5>
                    <p style={{ margin: '4px' }}>
                        You won't be able to sing in again!
                    </p>

                    <MenuButt clicked={this.deleteAccountHandler}><p style={{ color: 'red', margin: '0', marginTop: '6px' }}>DELETE</p>  </MenuButt>
                </div>
            </Fragment>)

        //When already logged:

        if (!this.props.token) {
            loginOrLogged = (<div className={classes.LoggedOut}>
                <h4>Login to the app to view this content!</h4>
            </div>)
        }

        return loginOrLogged
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isWarmMode: state.func.warmMode,
        isDemo: state.auth.isDemo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        wipeData: (email, password, loginOrRegister) => dispatch(actions.authSuccess(email, password, loginOrRegister)),
        warmMode: (on) => dispatch(actions.warmMode(on))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);