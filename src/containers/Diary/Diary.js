import React from 'react';
import DiaryTile from '../../components/Elements/Tiles/DiaryTile/DiaryTile';
import NewTile from '../../components/Elements/Tiles/NewTile/NewTile';
import classes from './Diary.module.css';
import Modal from '../../components/UI/Modal/Modal'
import NewDiary from '../../components/Elements/NewContent/NewDiary/NewDiary';
import DiaryPage from '../../components/Elements/Display/DiaryPage/DiaryPage';
import SearchFilter from '../../components/UI/SearchFilter/SearchFilter';
import ThingsBase from '../ThingsBase/ThingsBase';
import { connect } from 'react-redux';

class Diary extends ThingsBase {

    constructor(props) {
        super(props, {
            filter: {
                searchField: '',
                sortBy: 'date',
                showOnly: 'all'
            },
            directory: 'dairypages'
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

                    <SearchFilter barType='diary'
                        searchChanged={this.onSearch}
                        emotionChanged={this.onEmotionChange}
                        sortingChanged={this.onSortingChange} />

                    <NewTile clicked={this.addNew} background={classes.Background} />

                    {elementsArray.map(el => {

                        let tile = (
                            <DiaryTile
                                background={classes.Background}
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

                {/* {this.state.filter.searchField} */}

                <Modal
                    show={this.state.inputModalOpen}
                    modalClosed={this.hideInputModal}
                    background={classes.Background}>
                    <NewDiary
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
                        <DiaryPage
                            token={this.props.token}
                            id={this.props.id}
                            title={currentPage.title}
                            location={currentPage.location}
                            emotions={currentPage.emotions}
                            date={currentPage.date}
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

export default connect(mapStateToProps)(Diary);

