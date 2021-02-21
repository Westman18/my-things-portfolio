import React from 'react';
import ContactCard from '../../components/Elements/Tiles/ContactCard/ContactCard';
import NewCard from '../../components/Elements/Tiles/NewCard/NewCard';
import classes from './Contacts.module.css';
import Modal from '../../components/UI/Modal/Modal'
import NewContact from '../../components/Elements/NewContent/NewContact/NewContact';
import ContactPage from '../../components/Elements/Display/ContactPage/ContactPage';
import SearchFilter from '../../components/UI/SearchFilter/SearchFilter';
import ThingsBase from '../ThingsBase/ThingsBase';
import { connect } from 'react-redux';

class Contacts extends ThingsBase {

    constructor(props) {
        super(props, {
            filter: {
                searchField: '',
                sortBy: 'date',
                showOnly: 'all'
            },
            directory: 'contacts'
        })
    }

    onSearch = (event) => {
        const updatedFilter = { ...this.state.filter };
        updatedFilter.searchField = event.target.value;
        this.setState({ filter: updatedFilter })
    }

    onEmotionChange = (event) => {
        const updatedFilter = { ...this.state.filter };
        updatedFilter.showOnly = event.target.value;
        this.setState({ filter: updatedFilter })
    }

    onSortingChange = (event) => {
        const updatedFilter = { ...this.state.filter };
        updatedFilter.sortBy = event.target.value;
        console.log(updatedFilter)
        this.setState({ filter: updatedFilter })
        console.log('event', event.target.value)
        console.log(this.state.filter.sortBy)
    }

    render() {

        const currentPage = this.state.viewed ? this.state.items[this.state.viewed] : null;

        const elementsArray = [];
        for (let key in this.state.items) {
            elementsArray.push({
                id: key,
                content: this.state.items[key]
            })
        }

        if (this.state.filter.sortBy === 'date')
            elementsArray.sort((a, b) => {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.content.date) - new Date(a.content.date);
            })
        else {
            elementsArray.sort(function (a, b) {
                if (a.content.title < b.content.title) { return -1; }
                if (a.content.title > b.content.title) { return 1; }
                return 0;
            })

        }


        return (!this.props.isAuth ?

            <div className={classes.LoggedOut}>
                <h4>Login to the app to view this content!</h4>
            </div>

            :


            <div>


                <div className={classes.Dairy}>

                    <SearchFilter barType='calendar'
                        searchChanged={this.onSearch}
                        emotionChanged={this.onEmotionChange}
                        sortingChanged={this.onSortingChange} />

                    <NewCard clicked={this.addNew} />

                    {elementsArray.map(el => {

                        let tile = (
                            <ContactCard
                                background={classes.Background}
                                clicked={() => this.showViewModal(el.id)}
                                key={el.id}
                                content={el.content} />)

                        if (this.state.filter.searchField.trim() !== '') {
                            if (!el.content.name.toLowerCase().includes(this.state.filter.searchField.toLowerCase())) {
                                tile = null;
                            }
                        }

                        if (this.state.filter.showOnly !== 'all') {
                            if (el.content.important !== this.state.filter.showOnly) {
                                tile = null;
                            }
                        }

                        return (tile)

                    })}
                </div>

                {/* {this.state.filter.searchField} */}

                <Modal
                    show={this.state.inputModalOpen}
                    modalClosed={this.hideInputModal}
                    background={classes.Background}>
                    <NewContact
                        isDemo={this.props.isDemo}
                        token={this.props.token}
                        id={this.props.id}
                        content={(this.state.vieved !== '' && this.state.items) ? this.state.items[this.state.viewed] : null}
                        posted={this.itemsUpdated}
                        edited={this.viewedItemEdited}
                        cancel={this.hideInputModal}
                        postOrEdit={this.state.postOrEdit}
                        editedID={this.state.viewed} />
                </Modal>

                <Modal
                    show={this.state.viewModalOpen}
                    modalClosed={this.hideViewModal}
                    background={classes.Background}>
                    {currentPage ?
                        <ContactPage
                            token={this.props.token}
                            id={this.props.id}
                            name={currentPage.name}
                            important={currentPage.important}
                            phoneNumber={currentPage.phoneNumber}
                            gender={currentPage.gender}
                            email={currentPage.email}
                            content={currentPage.content}
                            delete={this.deleteViewed}
                            edit={this.editViewed} />
                        : null}
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
        isDemo: state.auth.isDemo
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//     }
// }

export default connect(mapStateToProps)(Contacts);

