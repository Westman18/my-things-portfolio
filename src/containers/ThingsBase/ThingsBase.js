import { Component } from 'react';
import axios from '../../axios-base'

import { storage } from '../../firebase/index';

class ThingsBase extends Component {

    constructor(props, s) {
        super(props)

        super.state = Object.assign(s, {
            inputModalOpen: false,
            viewModalOpen: false,
            items: null,
            viewed: '',
            postOrEdit: 'POST',
            editionDelete: false,

        })
    }

    hideInputModal = () => {
        this.setState({ inputModalOpen: false });
    }

    showInputModal = () => {
        this.setState({ inputModalOpen: true });
    }

    addNew = () => {
        this.setState({ postOrEdit: 'POST' })
        this.showInputModal();
    }

    showViewModal = (id) => {
        this.setState({
            viewModalOpen: true,
            viewed: id
        });
    }

    hideViewModal = () => {
        this.setState({ viewModalOpen: false });
    }

    componentDidMount() {
        this.fetchPosts();
    }

    itemsUpdated = () => {

        this.setState({postOrEdit: 'EDIT'})//forcing new entry update

        this.fetchPosts();
        this.hideInputModal();
        this.hideViewModal();

        this.setState({postOrEdit: 'POST'})//forcing new entry update
    }

    viewedItemEdited = () => {

        this.setState({ editionDelete: true })
        this.deleteViewed();
        this.setState({ editionDelete: false })
    }

    deleteViewed = () => {

        if (!this.state.editionDelete) {
            if (!window.confirm("Are you sure to delete this content?")) {
                return
            }
        }

        //ONLY FOR PICTURES STORAGE!
        if (this.state.directory === 'pictures') {

            var imageRef = storage.ref().child('images/' + this.state.items[this.state.viewed].picture);
            imageRef.delete().then(() => {
                window.alert('Deleted from database!')
            }).catch((error) => {
                console.log(error.message)
            });

            var tileRef = storage.ref().child('images/' + this.state.items[this.state.viewed].picture + '_tile');
            tileRef.delete().then(() => {
                window.alert('Deleted from database!')
            }).catch((error) => {
                console.log(error.message)
            });

        }

        let dir = this.state.directory;

        if (this.props.isDemo) {
            dir='demo/' + dir;
        }

        axios.delete('/' + dir + '/' + this.state.viewed + '.json?auth=' + this.props.token)
            .then(res => {
                this.itemsUpdated();
                this.setState({
                    viewed: '',
                    postOrEdit: 'POST'
                })
                // .catch( err => {
                //     console.log(err.message)
                // })
            })
    }

    editViewed = () => {
        this.setState({ postOrEdit: 'EDIT' })
        this.hideViewModal();
        this.showInputModal();
    }

    fetchPosts = () => {

        let dir = this.state.directory;

        if (this.props.isDemo) {
            dir='demo/' + dir;
        }

        const queryParams = '?auth=' + this.props.token + '&orderBy="userID"&equalTo="' + this.props.id + '"';

        axios.get('/' + dir + '.json' + queryParams)
            .then(response => {

                let fethedItems = {};

                for (let key in response.data) {
                    console.log(key)
                    fethedItems[key] = response.data[key].itemContents;
                }

                this.setState({ items: fethedItems });
                console.log('done')
            })
            .catch(err => {
                console.log(err.message)
            })
    }

}

export default ThingsBase;