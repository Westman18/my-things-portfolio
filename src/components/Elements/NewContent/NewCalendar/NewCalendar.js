import React, { Component } from 'react';
import Button from '../../../UI/MenuButt/MenuButt';
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input';

import classes from './NewCalendar.module.css';
import axios from '../../../../axios-base';

class NewCalendar extends Component {

    constructor(props) {
        super(props);
        var date = new Date();
        const dateInput = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);

        console.log(dateInput)

        console.log(props.content)

        this.initialState =

        {
            inputForm: {
                date: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'date',
                        placeholder: ''
                    },
                    validation: {
                        required: false
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.date : dateInput,

                    valid: true,
                    touched: true
                },

                time: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'time',
                        placeholder: ''
                    },
                    validation: {
                        required: true
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.time : '',

                    valid: false,
                    touched: false
                },

                location: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Location'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.location : '',
                    validation: {
                        required: false,
                    },
                    valid: true,
                    touched: false

                },
                title: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Event'
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
                        placeholder: 'Description...'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.content : '',
                    validation: {
                        required: false,
                        
                    },
                    valid: true,
                    touched: false

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

    static getDerivedStateFromProps(nextProps, prevState) {

        var date = new Date();
        const dateInput = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);

            const shouldUpdate = nextProps.postOrEdit === 'EDIT' && nextProps.content?true:false;



        return nextProps.postOrEdit !== prevState.postOrEdit || nextProps.editedID !== prevState.editedID ? {
            inputForm: {
                date: {
                    ...prevState.inputForm.date,
                    elementConfig: {
                        ...prevState.inputForm.date.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.date.validation
                    },
                    value: shouldUpdate ? nextProps.content.date : dateInput,

                    valid: true,
                    touched: true
                },

                time: {
                    ...prevState.inputForm.time,
                    elementConfig: {
                        ...prevState.inputForm.time.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.time.validation
                    },
                    value: shouldUpdate ? nextProps.content.time : dateInput,

                    valid: true,
                    touched: true
                },


                location: {
                    elementType: 'input',
                    elementConfig: {
                        ...prevState.inputForm.location.elementConfig
                    },
                    value: shouldUpdate ? nextProps.content.location : '',
                    validation: {
                        ...prevState.inputForm.location.validation
                    },
                    valid: true,
                    touched: true

                },
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
            formIsValid: true,
            loading: false,
            postOrEdit: nextProps.postOrEdit,
            editedID: nextProps.editedID
        }
            : null
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

        let dir = 'calendar';
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
        if (inputIdentifier === 'important'){
            updatedFormElement.value = event.target.checked;
        }else{
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

        if(formIsValid){
            console.log('checkbox', this.state.inputForm.important.value)
        }


        this.setState({ inputForm: updatedinputForm, formIsValid: formIsValid })//putting the whole obj to merge with state

    }


    render() {



        const formEls = { ...this.state.inputForm };

        let form = (

            <form onSubmit={this.postHandler}>
                <div className={classes.FormTop}>
                    <Input
                        key={'date'}
                        elementType={formEls.date.elementType}
                        elementConfig={formEls.date.elementConfig}
                        value={formEls.date.value}
                        invalid={!formEls.date.valid}
                        shouldValidate={formEls.date.validation.required}
                        touched={formEls.date.touched}
                        changed={(event) => this.inputChangedHandler(event, 'date')} />

                    <Input
                        key={'time'}
                        elementType={formEls.time.elementType}
                        elementConfig={formEls.time.elementConfig}
                        value={formEls.time.value}
                        invalid={!formEls.time.valid}
                        shouldValidate={formEls.time.validation.required}
                        touched={formEls.time.touched}
                        changed={(event) => this.inputChangedHandler(event, 'time')} />

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
                <div className={classes.FormTop}>
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
                        key={'location'}
                        elementType={formEls.location.elementType}
                        elementConfig={formEls.location.elementConfig}
                        value={formEls.location.value}
                        invalid={!formEls.location.valid}
                        shouldValidate={formEls.location.validation.required}
                        touched={formEls.location.touched}
                        changed={(event) => this.inputChangedHandler(event, 'location')} />

                </div>

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
            <div className={classes.NewCalendar}>
                <h4>{this.props.postOrEdit!== 'EDIT'? 'New entry':'Edit this entry'}</h4>
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

export default NewCalendar;