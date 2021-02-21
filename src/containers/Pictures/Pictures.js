import React from 'react';
import PictureTile from '../../components/Elements/Tiles/PictureTile/PictureTile';
import NewTile from '../../components/Elements/Tiles/NewTile/NewTile';
import classes from './Pictures.module.css';
import Modal from '../../components/UI/Modal/Modal'
import NewPicture from '../../components/Elements/NewContent/NewPicture/NewPicture';
import Picture from '../../components/Elements/Display/Picture/Picture';
import SearchFilter from '../../components/UI/SearchFilter/SearchFilter';
import ThingsBase from '../ThingsBase/ThingsBase';
import { connect } from 'react-redux';

class Pictures extends ThingsBase {

    constructor(props) {
        super(props, {
            filter: {
                searchField: '',
                sortBy: 'date',
                showOnly: 'all'
            },
            directory: 'pictures'
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

        const currentPicture = this.state.viewed ? this.state.items[this.state.viewed] : null;

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
            <div >
                <div className={classes.Pictures}>
                    <SearchFilter barType='diary'
                        searchChanged={this.onSearch}
                        emotionChanged={this.onEmotionChange}
                        sortingChanged={this.onSortingChange} />

                    <NewTile clicked={this.addNew} background={classes.Background} />

                    {elementsArray.map(el => {

                        let tile = (
                            <PictureTile
                                clicked={() => this.showViewModal(el.id)}
                                key={el.id}
                                content={el.content} />)

                        if (this.state.filter.searchField.trim() !== '') {
                            if (!el.content.title.toLowerCase().includes(this.state.filter.searchField.toLowerCase())) {
                                tile = null;
                            }
                        }

                        if (this.state.filter.showOnly !== 'all') {
                            if (el.content.emotions !== this.state.filter.showOnly) {
                                tile = null;
                            }
                        }

                        return (tile)

                    })}
                </div>


                <Modal
                    show={this.state.inputModalOpen}
                    modalClosed={this.hideInputModal}
                    background={classes.Background}>
                    <NewPicture
                        token={this.props.token}
                        id={this.props.id}
                        content={(this.state.vieved !== '' && this.state.items) ? this.state.items[this.state.viewed] : null}
                        posted={this.itemsUpdated}
                        edited={this.viewedItemEdited}
                        cancel={this.hideInputModal}
                        postOrEdit={this.state.postOrEdit}
                        editedID={this.state.viewed} 
                        isDemo= {this.props.isDemo}
                        />
                        
                </Modal>

                <Modal
                    show={this.state.viewModalOpen}
                    modalClosed={this.hideViewModal}
                    background={classes.Background}>
                    {currentPicture ?
                        <Picture
                            isDemo={this.props.isDemo}
                            token={this.props.token}
                            id={this.props.id}
                            title={currentPicture.title}
                            location={currentPicture.location}
                            emotions={currentPicture.emotions}
                            date={currentPicture.date}
                            pictureLink={currentPicture.pictureLink}
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

export default connect(mapStateToProps)(Pictures);

