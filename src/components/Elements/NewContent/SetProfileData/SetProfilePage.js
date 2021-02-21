import React, { Component } from 'react';
import Button from '../../../UI/MenuButt/MenuButt';
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input';

import classes from './SetProfilePage.module.css';
import axios from '../../../../axios-base';

class SetProfilePage extends Component {

    state = {
        inputForm: {

            birthdayDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: ''
                },
                validation: {
                    required: false
                },
                value: this.props.content ? this.props.content.birthdayDate : null,

                valid: true,
                touched: true
            },

            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: this.props.content ? this.props.content.firstName : null,
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false

            },
            secondName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Second Name'
                },
                value: this.props.content ? this.props.content.secondName : null,
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false

            },

            profession: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: this.props.content ? this.props.content.profession : null,
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false

            },

            bio: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Your memories...'
                },
                value: this.props.content ? this.props.content.bio : null,
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false

            },
        },
        formIsValid: false,
        loading: false,
        userDataId: this.props.userDataId ? this.props.userDataId : null,

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        return nextProps.userDataId !== prevState.userDataId ? {
            inputForm: {
                bio: {
                    ...prevState.inputForm.bio,
                    elementConfig: {
                        ...prevState.inputForm.bio.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.bio.validation
                    },
                    value: nextProps.content ? nextProps.content.bio : null,

                    valid: true,
                    touched: true
                },

                birthdayDate: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.birthdayDate.elementConfig
                    },
                    value: nextProps.content ? nextProps.content.birthdayDate : null,
                    validation: {
                        ...prevState.inputForm.birthdayDate.validation
                    },
                    valid: true,
                    touched: true

                },
                firstName: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.firstName.elementConfig
                    },
                    value: nextProps.content ? nextProps.content.firstName : null,
                    validation: {
                        ...prevState.inputForm.firstName.validation
                    },
                    valid: true,
                    touched: true

                },

                secondName: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.secondName.elementConfig
                    },
                    value: nextProps.content ? nextProps.content.secondName : null,
                    validation: {
                        ...prevState.inputForm.secondName.validation
                    },
                    valid: true,
                    touched: false

                },

                profession: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.profession.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.profession.validation
                    },
                    value: nextProps.content ? nextProps.content.profession : null,
                    valid: true
                },
            },
            formIsValid: true,
            loading: false,
            postOrEdit: nextProps.postOrEdit,
            editedID: nextProps.editedID
        }
            : null

    }

    setProfileHandler = (event) => { //execution way

        event.preventDefault();//prevents reloading // forms do that
        this.setState({ loading: true })


        if (!window.confirm(" Save this changes?")) {
            return
        }

        const postData = {};
        for (let formElementID in this.state.inputForm) {
            postData[formElementID] = this.state.inputForm[formElementID].value;
            //formElementID: value.
        }

        const newData = {
            userID: this.props.id,
            itemContents: postData
        }

        let dir = 'profile';
        if (this.props.isDemo) {
            dir = 'demo/' + dir;
        }

        axios.post('/' + dir + '.json?auth=' + this.props.token, newData)
            .then(response => {

                axios.delete('/profile/' + this.props.userDataId + '.json?auth=' + this.props.token)
                    .then(res => {
                        this.setState({
                            loading: false
                        })
                        this.props.wasChange();
                    })
            })
            .catch(error => {
                this.setState({ loading: false });
            });

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

    render() {



        const formEls = { ...this.state.inputForm };

        let form = (

            <form onSubmit={this.postHandler}>

                <div className={classes.Line}><div className={classes.Field}>First name:</div>
                <Input
                        key={'firstName'}
                        elementType={formEls.firstName.elementType}
                        elementConfig={formEls.firstName.elementConfig}
                        value={formEls.firstName.value}
                        invalid={!formEls.firstName.valid}
                        shouldValidate={formEls.firstName.validation.required}
                        touched={formEls.firstName.touched}
                        changed={(event) => this.inputChangedHandler(event, 'firstName')} />
                </div>
                <div className={classes.Line}> <div className={classes.Field}>Second name:</div>
                <Input
                        key={'secondName'}
                        elementType={formEls.secondName.elementType}
                        elementConfig={formEls.secondName.elementConfig}
                        value={formEls.secondName.value}
                        invalid={!formEls.secondName.valid}
                        shouldValidate={formEls.secondName.validation.required}
                        touched={formEls.secondName.touched}
                        changed={(event) => this.inputChangedHandler(event, 'secondName')} />
                </div>
                <div className={classes.Line}> <div className={classes.Field}>Birthday date:</div>
                <Input
                        key={'birthdayDate'}
                        elementType={formEls.birthdayDate.elementType}
                        elementConfig={formEls.birthdayDate.elementConfig}
                        value={formEls.birthdayDate.value}
                        invalid={!formEls.birthdayDate.valid}
                        shouldValidate={formEls.birthdayDate.validation.required}
                        touched={formEls.birthdayDate.touched}
                        changed={(event) => this.inputChangedHandler(event, 'birthdayDate')} />
                </div>
                <div className={classes.Line}> <div className={classes.Field}>Profession:</div> 
                <Input
                        key={'profession'}
                        elementType={formEls.profession.elementType}
                        elementConfig={formEls.profession.elementConfig}
                        value={formEls.profession.value}
                        invalid={!formEls.profession.valid}
                        shouldValidate={formEls.profession.validation.required}
                        touched={formEls.profession.touched}
                        changed={(event) => this.inputChangedHandler(event, 'profession')} />
                </div>
                <div className={classes.Line}> <div className={classes.Field}>Bio:</div> <div></div></div>
                <div className={classes.Line}>
                    <Input
                        key={'bio'}
                        elementType={formEls.bio.elementType}
                        elementConfig={formEls.bio.elementConfig}
                        value={formEls.bio.value}
                        invalid={!formEls.bio.valid}
                        shouldValidate={formEls.bio.validation.required}
                        touched={formEls.bio.touched}
                        changed={(event) => this.inputChangedHandler(event, 'bio')} />
                </div>



            </form>);

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.NewDairy}>
                <h4>Your profile:</h4>
                {form}
                <Button clicked={this.setProfileHandler}
                    disabled={!this.state.formIsValid}>
                    SET</Button>
                {' '}
                <Button clicked={this.props.cancel}>
                    CANCEL</Button>
            </div>
        )
    }
}

export default SetProfilePage;