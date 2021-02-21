import { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/SideDrawer/SideDrawer';
import RightSideDrawer from '../../components/UI/RightSideDrawer/RightSideDrawer';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Layout extends Component {

    state = {
        showLeftDrawer: false,
        showRightDrawer: false,
        drawerWasOutsourced: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.showMenu&&!prevState.drawerWasOutsourced?{showLeftDrawer: true, drawerWasOutsourced:true}:null;
    }

    

    leftDrawerHandler = () => {
        this.setState({ showLeftDrawer: !this.state.showLeftDrawer })

    }

    rightDrawerHandler = () => {
        this.setState({ showRightDrawer: !this.state.showRightDrawer })
    }

    // logoutHandler = () => {
    //     this.props.onLogout();
    //     window.alert('You logged out successfully!');
    // }


    render() {

        let attachedClasses = [classes.Content, classes.LeftClosed]
        if (this.state.showLeftDrawer) {
            attachedClasses = [classes.Content, classes.LeftOpened]
        }

        return (
            <div className={classes.Layout}>
                <Toolbar
                    onLogout={this.props.onLogout}
                    isAuth={this.props.isAuthenticated}
                    handleMenu={this.leftDrawerHandler}
                    handleInfo={this.rightDrawerHandler}
                    warmMode={this.props.warmMode} />
                <SideDrawer
                    logout={this.props.onLogout}
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showLeftDrawer}
                    backdropClick={this.leftDrawerHandler} 
                    warmMode={this.props.warmMode} />
                <RightSideDrawer
                hide={this.rightDrawerHandler}
                    open={this.state.showRightDrawer}
                    backdropClick={this.rightDrawerHandler} />
                <div className={attachedClasses.join(' ')}>{this.props.children}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        showMenu: state.func.showMenu,
        warmMode: state.func.warmMode
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (email, password, loginOrRegister) => dispatch(actions.logout(email, password, loginOrRegister))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);