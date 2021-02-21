import React, { Component } from 'react';
import Button from '../../../UI/MenuButt/MenuButt';
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input';

import classes from './NewContact.module.css';
import axios from '../../../../axios-base';

class NewContact extends Component {

    constructor(props) {
        super(props);


        console.log(props.content)

        this.initialState =

        {
            inputForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Full name'
                    },
                    validation: {
                        required: false
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.name : '',

                    valid: true,
                    touched: true
                },

                phoneNumber: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Phone number'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.phoneNumber : '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false

                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'E-mail address'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.email : '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false

                },

                content: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'Additional info...'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.content : '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false

                },

                gender: {
                    elementType: 'select',
                    elementConfig: {
                        question: 'Gender:',
                        options: [
                            { value: 'female', displayValue: 'female' },
                            { value: 'male', displayValue: 'male' },
                            { value: 'other', displayValue: 'other' },
                            { value: 'group/company', displayValue: 'group/company' }
                        ]
                    },
                    validation: {
                        required: false
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.gender : 'female',
                    valid: true
                },

                important: {
                    elementType: 'checkbox',
                    elementConfig: {
                        question: 'Important?',

                    },
                    validation: {
                        required: false
                    },

                    value: props.postOrEdit === 'EDIT' ? props.content.important : false,
                    valid: true
                },
            },
            formIsValid: false,
            loading: false,
            postOrEdit: 'POST',
            editedID: props.postOrEdit === 'EDIT' ? props.editedID : ''
        }

        this.state = this.initialState;
    }



    postOrEditHandler = (event) => { //execution way

        event.preventDefault();//prevents reloading // forms do that
        this.setState({ loading: true })


        if (this.state.postOrEdit === 'EDIT') {
            if (!window.confirm("You won't be able to undo this changes.")) {
                return
            }
        }


        const postData = {};
        for (let formElementID in this.state.inputForm) {
            postData[formElementID] = this.state.inputForm[formElementID].value;
            //formElementID: value.
        }

        const newPost = {
            userID: this.props.id,
            itemContents: postData
        }
        let dir = 'contacts';
        if (this.props.isDemo){
            dir = 'demo/' + dir;
        }

        axios.post('/'+dir+'.json?auth=' + this.props.token, newPost)
            .then(response => {
                this.setState({ loading: false });
                // this.props.history.push('/home/dairy');
                this.props.posted();
                console.log('im here')

            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });

        if (this.state.postOrEdit === 'EDIT') {
            this.props.edited()

        }
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
        if (inputIdentifier === 'important') {
            updatedFormElement.value = event.target.checked;
        } else {
            updatedFormElement.value = event.target.value;
        }
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

    static getDerivedStateFromProps(nextProps, prevState) {

        const shouldUpdate = nextProps.postOrEdit === 'EDIT' && nextProps.content ? true : false;

        return nextProps.postOrEdit !== prevState.postOrEdit || nextProps.editedID !== prevState.editedID ? {
            inputForm: {
                name: {
                    ...prevState.inputForm.name,
                    elementConfig: {
                        ...prevState.inputForm.name.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.name.validation
                    },
                    value: shouldUpdate ? nextProps.content.name : '',

                    valid: shouldUpdate? true:false,
                    touched: false
                },

                phoneNumber: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.phoneNumber.elementConfig
                    },
                    value: shouldUpdate ? nextProps.content.phoneNumber : '',
                    validation: {
                        ...prevState.inputForm.phoneNumber.validation
                    },
                    valid: shouldUpdate? true:false,
                    touched: false

                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.email.elementConfig
                    },
                    value: shouldUpdate ? nextProps.content.email : '',
                    validation: {
                        ...prevState.inputForm.email.validation
                    },
                    valid: shouldUpdate? true:false,
                    touched: false

                },

                content: {
                    elementType: 'textarea',
                    elementConfig: {
                        ...prevState.inputForm.content.elementConfig
                    },
                    value: shouldUpdate ? nextProps.content.content : '',
                    validation: {
                        ...prevState.inputForm.content.validation
                    },
                    valid: true,
                    touched: false

                },

                gender: {
                    elementType: 'select',
                    elementConfig: {
                        ...prevState.inputForm.gender.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.gender.validation
                    },
                    value: shouldUpdate ? nextProps.content.gender : 'female',
                    valid: true
                },

                important: {
                    elementType: 'checkbox',
                    elementConfig: {
                        ...prevState.inputForm.important.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.important.validation
                    },
                    value: shouldUpdate ? nextProps.content.important : false,
                    valid: true
                },
            },
            formIsValid: shouldUpdate? true:false,
            loading: false,
            postOrEdit: nextProps.postOrEdit,
            editedID: nextProps.editedID
        }
            : null

    }


    render() {



        const formEls = { ...this.state.inputForm };

        let form = (

            <form onSubmit={this.postHandler}>
                <div className={classes.FormTop}>
                    <Input
                        key={'name'}
                        elementType={formEls.name.elementType}
                        elementConfig={formEls.name.elementConfig}
                        value={formEls.name.value}
                        invalid={!formEls.name.valid}
                        shouldValidate={formEls.name.validation.required}
                        touched={formEls.name.touched}
                        changed={(event) => this.inputChangedHandler(event, 'name')} />
                   
                        

                        <Input
                            key={'gender'}
                            elementType={formEls.gender.elementType}
                            elementConfig={formEls.gender.elementConfig}
                            value={formEls.gender.value}
                            invalid={!formEls.gender.valid}
                            shouldValidate={formEls.gender.validation.required}
                            touched={formEls.gender.touched}
                            changed={(event) => this.inputChangedHandler(event, 'gender')} />

                 




                </div>
                <div className={classes.FormTop}>
                    <Input
                        key={'phoneNumber'}
                        elementType={formEls.phoneNumber.elementType}
                        elementConfig={formEls.phoneNumber.elementConfig}
                        value={formEls.phoneNumber.value}
                        invalid={!formEls.phoneNumber.valid}
                        shouldValidate={formEls.phoneNumber.validation.required}
                        touched={formEls.phoneNumber.touched}
                        changed={(event) => this.inputChangedHandler(event, 'phoneNumber')} />
                    <Input
                        key={'email'}
                        elementType={formEls.email.elementType}
                        elementConfig={formEls.email.elementConfig}
                        value={formEls.email.value}
                        invalid={!formEls.email.valid}
                        shouldValidate={formEls.email.validation.required}
                        touched={formEls.email.touched}
                        changed={(event) => this.inputChangedHandler(event, 'email')} />
                        <Input
                            key={'impotrant'}
                            elementType={formEls.important.elementType}
                            elementConfig={formEls.important.elementConfig}
                            value={formEls.important.value}
                            invalid={!formEls.important.valid}
                            shouldValidate={formEls.important.validation.required}
                            touched={formEls.important.touched}
                            changed={(event) => this.inputChangedHandler(event, 'important')} />



                </div>

                <Input
                    small
                    key={'content'}
                    elementType={formEls.content.elementType}
                    elementConfig={formEls.content.elementConfig}
                    value={formEls.content.value}
                    invalid={!formEls.content.valid}
                    shouldValidate={formEls.content.validation.required}
                    touched={formEls.content.touched}
                    changed={(event) => this.inputChangedHandler(event, 'content')} />
            </form>);

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.NewContact}>
                <h4>{this.props.postOrEdit !== 'EDIT' ? 'New contact' : 'Edit this contact'}</h4>
                {form}
                <Button clicked={this.postOrEditHandler}
                    disabled={!this.state.formIsValid}>
                    {this.props.postOrEdit}</Button>
                {' '}
                <Button clicked={this.props.cancel}>
                    CANCEL</Button>
            </div>
        )
    }
}

export default NewContact;