
import React, { Component, Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !==this.props.children
    // }
    render() {

        let modalClasses = [classes.Modal, classes.Hide, this.props.background]
        if (this.props.show) {
            modalClasses = [classes.Modal, classes.Show, this.props.background]
        }
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />

                <div className={classes.Margin}>
                    <div
                        className={modalClasses.join(' ')}>
                        {this.props.children}
                    </div>
                </div>




            </div>
        )
    }
}

export default Modal;