import React, { Fragment } from 'react';
import CalendarStrap from '../../components/Elements/Tiles/CalendarStrap/CalendarStrap';
import NewStrap from '../../components/Elements/Tiles/NewStrap/NewStrap';
import classes from './Calendar.module.css';
import Modal from '../../components/UI/Modal/Modal'
import NewCalendar from '../../components/Elements/NewContent/NewCalendar/NewCalendar';
import CalendarPage from '../../components/Elements/Display/CalendarPage/CalendarPage';
import SearchFilter from '../../components/UI/SearchFilter/SearchFilter';
import ThingsBase from '../ThingsBase/ThingsBase';
import { connect } from 'react-redux';

class Calendar extends ThingsBase {

    constructor(props) {
        super(props, {
            filter: {
                searchField: '',
                sortBy: 'date',
                showOnly: 'all'
            },
            directory: 'calendar'
        })
    }

    onSearch = (event) => {
        const updatedFilter = { ...this.state.filter };
        updatedFilter.searchField = event.target.value;
        this.setState({ filter: updatedFilter })
    }

    onImportanceChange = (event) => {
        const updatedFilter = { ...this.state.filter };
        updatedFilter.showOnly = event.target.value;
        // console.log('up',updatedFilter.showOnly)
        this.setState({ filter: updatedFilter })
    }

    makeNiceDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth(); // month (integer 0-11)
        const year = date.getFullYear(); // year

        const monthWords = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthWord = monthWords[month];
        return (day + ' ' + monthWord + ' ' + year)
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

        //Sorter


        elementsArray.sort((a, b) => {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.

            console.log('time compare', b.content.time)

            console.log('date compare', new Date(a.content.date) - new Date(b.content.date))
            return new Date(a.content.date) - new Date(b.content.date) || (a.content.time > b.content.time ? 1 : -1);
        })

        let savedDate = 0;//date field initiation

        let wasTile = false;

        return (!this.props.isAuth ?

            <div className={classes.LoggedOut}>
                <h4>Login to the app to view this content!</h4>
            </div>
            :
            <div>
                <div className={classes.Calendar}>

                    <SearchFilter barType='calendar'
                        searchChanged={this.onSearch}
                        importanceChanged={this.onImportanceChange}
                        sortingChanged={this.onSortingChange} />

                    <NewStrap clicked={this.addNew} />

                    {elementsArray.map(el => {

                        let currentDate = new Date(el.content.date);
                        let dayDivider = null;
                        console.log('currentDate', new Date(el.content.date))
                        console.log('savedDate', savedDate)

                        if (currentDate > savedDate) {
                            dayDivider =
                                <div className={classes.Divider}
                                    key={el.content.date}>
                                    <hr /><h5>{this.makeNiceDate(new Date(el.content.date))}</h5><hr />
                                </div>
                        }

                        savedDate = currentDate;

                        let tile = (
                            <Fragment key={el.id}>
                                {dayDivider}
                                <CalendarStrap
                                    background={classes.Background}
                                    clicked={() => this.showViewModal(el.id)}
                                    content={el.content} />
                            </Fragment>
                        )



                        if (this.state.filter.searchField.trim() !== '') {
                            if (!el.content.title.toLowerCase().includes(this.state.filter.searchField.toLowerCase())) {
                                tile = null;
                            }
                        }

                        console.log('showonly', this.state.filter.showOnly, el.content.important)


                        if (this.state.filter.showOnly === 'important' && !el.content.important) {

                            tile = null;

                        }

                        if (new Date(el.content.date + ' ' + el.content.time) < new Date()) {
                            tile = null;
                        }

                        console.log('dates', new Date(el.content.date), new Date())



                        if (tile) {
                            wasTile = true;
                        }

                        return (tile)

                    })}
                </div>


                {wasTile ? null :
                    <div className={classes.Divider}
                        style={{ display: 'inline', itemsAlign: 'right' }}>
                        <h4 >No upcoming events!</h4>
                    </div>}

                <Modal
                    show={this.state.inputModalOpen}
                    modalClosed={this.hideInputModal}
                    background={classes.Background}>
                    <NewCalendar

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
                        <CalendarPage

                            token={this.props.token}
                            id={this.props.id}
                            title={currentPage.title}
                            location={currentPage.location}
                            important={currentPage.important}
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

export default connect(mapStateToProps)(Calendar);

