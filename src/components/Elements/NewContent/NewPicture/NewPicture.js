import React, { Component } from 'react';
import Button from '../../../UI/MenuButt/MenuButt';
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input';

import classes from './NewPicture.module.css';
import axios from '../../../../axios-base';
// import Picture from '../../Display/Picture/Picture';
import Compressor from 'compressorjs';

import { storage } from '../../../../firebase/index';

class NewPicture extends Component {

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

                location: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Location'
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.location : '',
                    validation: {
                        required: false,
                        minLength: 1
                    },
                    valid: false,
                    touched: false

                },
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
                /////////////////////////////////////\/
                picture: {
                    elementType: 'file',
                    elementConfig: {
                        type: 'file',
                        placeholder: 'Your picture...',
                        accept:"image/png, image/jpeg"
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.title + '_' + props.content.date : '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                    ////////////////////////////////////////\
                },

                emotions: {
                    elementType: 'select',
                    elementConfig: {
                        question: 'How was it?',
                        options: [
                            { value: 'good', displayValue: 'good' },
                            { value: 'normal', displayValue: 'normal' },
                            { value: 'bad', displayValue: 'bad' }
                        ]
                    },
                    validation: {
                        required: false
                    },
                    value: props.postOrEdit === 'EDIT' ? props.content.emotions : 'good',
                    valid: true
                },
            },
            formIsValid: false,
            loading: false,
            postOrEdit: 'POST',
            editedID: props.postOrEdit === 'EDIT' ? props.editedID : '',

            image: null,

            pictureLink: {
                value: ''
            },
            tileLink: {
                value: ''
            }
        }

        this.state = this.initialState;
    }
    ///constructor ends

    static getDerivedStateFromProps(nextProps, prevState) {

        var date = new Date();
        const dateInput = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);

            const shouldUpdate = nextProps.postOrEdit === 'EDIT' && nextProps.content ? true : false;

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
                    touched: false
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
                    touched: false

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
                    touched: false

                },
                /////////////////////////////////////\/
                picture: {
                    elementType: 'file',
                    elementConfig: {
                        ...prevState.inputForm.picture.elementConfig
                    },
                    value: shouldUpdate ? nextProps.content.title + '_' + nextProps.content.date : '',
                    validation: {
                        ...prevState.inputForm.picture.validation
                    },
                    valid: true,
                    touched: false
                },

                ////////////////////////////////////////\

                emotions: {
                    elementType: 'select',
                    elementConfig: {
                        ...prevState.inputForm.emotions.elementConfig
                    },
                    validation: {
                        ...prevState.inputForm.emotions.validation
                    },
                    value: 'good',
                    valid: true
                },

                pictureLink: {
                    value: ''
                },
                tileLink: {
                    value: ''
                }
            },
            formIsValid: true,
            loading: false,
            postOrEdit: nextProps.postOrEdit,
            editedID: nextProps.editedID,

            image: null//
        }
            : null

    }

    ///////////////////////////////////////////////////////////////////////////////state preparation ends


    postOrEditHandler = (event) => { //execution way

        event.preventDefault();//prevents reloading // forms do that
        this.setState({ loading: true })


        if (this.state.postOrEdit === 'EDIT') {
            if (!window.confirm("You won't be able to undo this changes.")) {
                return
            }
        }

        ///CODE TO SEND PICTURE DATA!!!////

        const dataSender = (pictureLink, tileLink) => {
            const postData = {};
            for (let formElementID in this.state.inputForm) {
                postData[formElementID] = this.state.inputForm[formElementID].value;
                //formElementID: value.
            }

            postData['pictureLink'] = pictureLink;
            postData['tileLink'] = tileLink;

            //appending link coming from the firebase storage

            const newPost = {
                userID: this.props.id,
                itemContents: postData
            }
            let dir = 'pictures';
            if (this.props.isDemo){
                dir = 'demo/' + dir;
            }
    
            axios.post('/'+dir+'.json?auth=' + this.props.token, newPost)
                .then(response => {
                    this.setState({ loading: false });
                    this.props.posted();
                    console.log('im here')
                    this.setState({
                        loading: false
                    });

                })
                .catch(error => {
                    this.setState({
                        loading: false
                    });
                    console.log(error.message)
                });

            if (this.state.postOrEdit === 'EDIT') {
                this.props.edited()
            }
        }


        //compressing the image + uplading right away

        //Compressor fn:
        const uploadImageToStorage = (image, name, isTile) => {

        }

        const image = this.state.image;
        const imageName = this.state.inputForm.picture.value;
        const cmp = (file, name) => new Compressor(file, name);

        if (!image) {
            window.alert('No image was added!')
            return;
        }

        cmp(image, {
            quality: 0.6,
            maxWidth: 1900,
            success(result) {
                ///first compressed ->starting upload
                const uploadTask = storage.ref(`images/${imageName}`)
                    .put(result);

                uploadTask.on(
                    "state_changed",
                    snapshot => { },
                    error => {
                        console.log(error)
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(imageName)
                            .getDownloadURL()
                            .then(//first uploaded compress next
                                picUrl => {
                                    //first uploaded / you have picUrl already!
                                    //MINIATURE COMPRESSION STARTS!!
                                    cmp(image, {
                                        quality: 0.1,
                                        maxWidth: 1000,
                                       
                                        success(result) {
                                            const tileName=imageName + '_tile';//changing name 
                                            ///second compressed ->starting upload
                                            const uploadTask = storage.ref(`images/${tileName}`)
                                                .put(result);

                                            uploadTask.on(
                                                "state_changed",
                                                snapshot => { },
                                                error => {
                                                    console.log(error)
                                                },
                                                () => {
                                                    storage
                                                        .ref("images")
                                                        .child(tileName)
                                                        .getDownloadURL()
                                                        .then(//second uploaded now append the links and send data to realtime
                                                            tileUrl => {
                                                                dataSender(picUrl, tileUrl)
                                                            }
                                                        )
                                                }
                                            )
                                        },
                                        error(err) {
                                            console.log(err.message);
                                        }
                                    });
                                }
                            )
                    }
                )
            },
            error(err) {
                console.log(err.message);
            }
        });

        //comressing the miniatre and uploding right away





    }




    checkValidity = (value, rules) => {
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

        if (inputIdentifier !== 'picture') {//preventing picture "value", gonna be set to title_date later here...
            updatedFormElement.value = event.target.value;
            console.log('no picture')
        } else {
            //HERE I DISPATCH PICTURE CASE > to state
            if (event.target.files[0]) {
                this.setState({ image: event.target.files[0] });
                console.log('adding img', event.target.files[0])
            }


        }
        // console.log("state", this.state.inputForm[inputIdentifier].value)

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation.required)
        updatedFormElement.touched = true;
        updatedinputForm[inputIdentifier] = updatedFormElement;

        //checking the whole form validity every time
        let formIsValid = true;
        for (let inputIdentifier in updatedinputForm) {
            formIsValid = updatedinputForm[inputIdentifier].valid && formIsValid //a tail, backcheck
        }

        //if form is valid -> set the picture value to title_date



        this.setState({ inputForm: updatedinputForm, formIsValid: formIsValid })//putting the whole obj to merge with state

        if (formIsValid) {
            const updatedPictureForm = {
                ...this.state.inputForm //doesn't create a deep copy!!
                //this way only one level copy comes out

            };
            const updatedPicture = {
                ...updatedPictureForm['picture']//copying the single element that i care of - 2nd level copy
            };
            updatedPicture.value = this.state.inputForm.title.value + '_' + this.state.inputForm.date.value;
            updatedPictureForm['picture'] = updatedPicture;
            this.setState({ inputForm: updatedPictureForm })//putting the whole obj to merge with state


        }
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
                        key={'location'}
                        elementType={formEls.location.elementType}
                        elementConfig={formEls.location.elementConfig}
                        value={formEls.location.value}
                        invalid={!formEls.location.valid}
                        shouldValidate={formEls.location.validation.required}
                        touched={formEls.location.touched}
                        changed={(event) => this.inputChangedHandler(event, 'location')} />

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
                        key={'emotions'}
                        elementType={formEls.emotions.elementType}
                        elementConfig={formEls.emotions.elementConfig}
                        value={formEls.emotions.value}
                        invalid={!formEls.emotions.valid}
                        shouldValidate={formEls.emotions.validation.required}
                        touched={formEls.emotions.touched}
                        changed={(event) => this.inputChangedHandler(event, 'emotions')} />

                </div>

                <Input
                    key={'picture'}
                    elementType={formEls.picture.elementType}
                    elementConfig={formEls.picture.elementConfig}
                    // value={formEls.picture.value}
                    invalid={!formEls.picture.valid}
                    shouldValidate={formEls.picture.validation.required}
                    touched={formEls.picture.touched}
                    changed={(event) => this.inputChangedHandler(event, 'picture')} />
            </form>);

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.NewPicture}>
                <h4>Add picture:</h4>
                {form}
                <Button clicked={this.postOrEditHandler}
                    disabled={!this.state.formIsValid}>
                    {this.props.postOrEdit}</Button>
                {' '}
                <Button clicked={this.props.cancel}>
                    CANCEL
                </Button>
            </div>
        )
    }
}

export default NewPicture;