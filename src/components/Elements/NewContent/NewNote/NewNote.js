import React, { Component } from 'react';
import classes from './NewNote.module.css';
import axios from '../../../../axios-base';

import Button from '../../../UI/MenuButt/MenuButt';
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input';

class NewNote extends Component {

    constructor(props) {
        super(props)
        this.initialState = {
            inputForm: {

                title: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Title'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.title : '',
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
                        placeholder: 'Text...'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.content : '',
                    validation: {
                        required: true,
                        minLength: 3
                    },
                    valid: false,
                    touched: false

                }
            },
            formIsValid: true,
            loading: false,
            postOrEdit: 'POST',
            editedID: props.postOrEdit === 'EDIT' ? props.editedID : ''
        }

        this.state = this.initialState;

    }

    postOrEditHandler = (event) => { //execution way

        if (this.state.postOrEdit === 'EDIT') {
        if (!window.confirm("You won't be able to undo this changes.")) {
            return
        }}

        event.preventDefault();//prevents reloading // forms do that
        this.setState({ loading: true })

        const postData = {};
        for (let formElementID in this.state.inputForm) {
            postData[formElementID] = this.state.inputForm[formElementID].value;
            //formElementID: value.
        }

        const newPost = {
            userID: this.props.id,
            itemContents: postData
        }
        let dir = 'notes';
        if (this.props.isDemo){
            dir = 'demo/' + dir;
        }

        axios.post('/'+dir+'.json?auth=' + this.props.token, newPost)
            .then(response => {
                this.setState({ loading: false });
                this.props.posted();
                this.setState(this.initialState)
                // this.props.history.push('/home/dairy');

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
            ...this.state.inputForm 
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

    static getDerivedStateFromProps(nextProps, prevState) {

        const shouldUpdate = nextProps.postOrEdit === 'EDIT' && nextProps.content ? true : false;

        return nextProps.postOrEdit !== prevState.postOrEdit || nextProps.editedID !== prevState.editedID ? {
            inputForm: {

                title: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.title.elementConfig
                    },
                    value: shouldUpdate ? nextProps.content.title : '',
                    validation: {
                        ...prevState.inputForm.title.validation
                    },
                    valid: true,
                    touched: true

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
            },

            formIsValid: true,
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
                <Input
                    key={'title'}
                    elementType={formEls.title.elementType}
                    elementConfig={formEls.title.elementConfig}
                    value={formEls.title.value}
                    invalid={!formEls.title.valid}
                    shouldValidate={formEls.title.validation.required}
                    touched={formEls.title.touched}
                    changed={(event) => this.inputChangedHandler(event, 'title')} />

                <Input
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
            <div className={classes.NewThought}>
                <h3>New note</h3>
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

export default NewNote;