import React from 'react';
import NewThought from '../../components/Elements/NewContent/NewThought/NewThought';
import NewTile from '../../components/Elements/Tiles/NewTile/NewTile';
import ThoughtTile from '../../components/Elements/Tiles/ThoughtTile/ThoughtTile';
import Modal from '../../components/UI/Modal/Modal';
import classes from './GoldenThoughts.module.css';
import GoldenThought from '../../components/Elements/Display/GoldenThought/GoldenThought';
import ThingsBase from '../ThingsBase/ThingsBase'
import { connect } from 'react-redux';
import SearchField from '../../components/UI/SearchField/SearchField';



class GoldenThoughts extends ThingsBase {

    constructor(props) {
        super(props, {
            directory: 'thoughts',
            filter: {
                searchField: '',
                sortBy: 'date',
                showOnly: 'all'
            },
        })
    }
    onSearch = (event) => {
        const updatedFilter = { ...this.state.filter };
        updatedFilter.searchField = event.target.value;
        this.setState({ filter: updatedFilter })
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

        return (!this.props.isAuth ?

            <div className={classes.LoggedOut}>
                <h4>Login to the app to view this content!</h4>
            </div>

            :
            <div className={classes.GoldenThoughts}>
                <SearchField searchChanged={this.onSearch}
                />
                <NewTile clicked={this.addNew}
                    background={classes.Background} />

                {elementsArray.map(el => {

                    let tile = (
                        <ThoughtTile
                            background={classes.Background}
                            clicked={() => this.showViewModal(el.id)}
                            key={el.id}
                            content={el.content} />)

                    if (this.state.filter.searchField.trim() !== '') {
                        if (!el.content.title.toLowerCase().includes(this.state.filter.searchField.toLowerCase())) {
                            tile = null;
                        }
                    }

                    return (tile)

                })}

                <Modal
                    show={this.state.inputModalOpen}
                    modalClosed={this.hideInputModal}
                    background={classes.Background}>
                    <NewThought
                        isDemo={this.props.isDemo}
                        id={this.props.id}
                        token={this.props.token}
                        content={(this.state.vieved !== '' && this.state.items) ? this.state.items[this.state.viewed] : null}
                        posted={this.itemsUpdated}
                        cancel={this.hideInputModal}
                        edited={this.viewedItemEdited}
                        postOrEdit={this.state.postOrEdit}
                        editedID={this.state.viewed} />

                </Modal>

                <Modal
                    show={this.state.viewModalOpen}
                    modalClosed={this.hideViewModal}
                    background={classes.Background}>
                    {currentPage ?
                        <GoldenThought
                            title={currentPage.title}
                            content={currentPage.content}
                            delete={this.deleteViewed}
                            edit={this.editViewed} />
                        : null}
                </Modal>

            </div>);
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token ? true : false,
        id: state.auth.userId,
        token: state.auth.token,
        isDemo: state.auth.isDemo

    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//     }
// }

export default connect(mapStateToProps)(GoldenThoughts);
