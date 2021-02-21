import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-base';

import classes from './ProfilePage.module.css';

import Modal from '../../components/UI/Modal/Modal'
import SetProfilePage from '../../components/Elements/NewContent/SetProfileData/SetProfilePage';
import MenuButt from '../../components/UI/MenuButt/MenuButt';



class ProfilePage extends Component {

    state = {
        profileItems: null,
        inputModalOpen: false,
        userDataId: null
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {

        const queryParams = '?auth=' + this.props.token + '&orderBy="userID"&equalTo="' + this.props.id + '"';


        let dir = 'profile';
        if (this.props.isDemo) {
            dir = 'demo/' + dir;
        }
        axios.get('/' + dir + '.json' + queryParams)
            .then(response => {
                this.setState({ profileItems: response.data.profileContents });
                let fethedItems = {};
                let userDataId = '';

                for (let key in response.data) {
                    fethedItems = response.data[key].itemContents;
                    userDataId = key;
                }
                this.setState({ profileItems: fethedItems, userDataId: userDataId });
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    wasChange = () => {
        this.hideInputModal();
        this.fetchData();
    }

    hideInputModal = () => {
        this.setState({ inputModalOpen: false });
    }

    showInputModal = () => {
        this.setState({ inputModalOpen: true });
    }


    render() {
        return (!this.props.isAuth ?

            <div className={classes.LoggedOut}>
                <h4>Login to the app to view this content!</h4>
            </div>
            :
            <div className={classes.ProfiePage}>

              <div className={classes.Line}>First name: <div className={classes.Field}><p>{' '}{this.state.profileItems ? this.state.profileItems.firstName : 'not set'}</p></div> </div>
              <div className={classes.Line}> Second name: <div className={classes.Field}><p>{' '}{this.state.profileItems ? this.state.profileItems.secondName : 'not set'}</p></div></div>
              <div className={classes.Line}> Birthday date: <div className={classes.Field}><p>{' '}{this.state.profileItems ? this.state.profileItems.birthdayDate : 'not set'}</p></div></div>
              <div className={classes.Line}> Profession: <div className={classes.Field}><p>{' '}{this.state.profileItems ? this.state.profileItems.profession : 'not set'}</p></div></div>
              <div className={classes.Line}> Bio: <div></div></div>
              <div className={classes.Line}><div className={classes.Area}><p>{' '}{this.state.profileItems ? this.state.profileItems.bio : 'not set'}</p></div></div>
              <hr style={{width:'50%'}}></hr>
                <MenuButt clicked={this.showInputModal} disabled={this.props.isDemo}>SET or EDIT data</MenuButt>

                <Modal
                    show={this.state.inputModalOpen}
                    modalClosed={this.hideInputModal}
                    background={classes.Background}>
                    <SetProfilePage
                        user={this.props.user}
                        userDataId={this.state.userDataId}
                        token={this.props.token}
                        isDemo={this.props.isDemo}
                        id={this.props.id}
                        content={this.state.profileItems}
                        wasChange={this.wasChange}
                        cancel={this.hideInputModal}
                        postOrEdit={this.state.postOrEdit}
                        editedID={this.state.viewed} />
                </Modal>



            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.token ? true : false,
        id: state.auth.userId,
        user: state.auth.userName,
        isDemo: state.auth.isDemo
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//     }
// }

export default connect(mapStateToProps)(ProfilePage);

