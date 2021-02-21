import Layout from './containers/Layout/Layout';
import Diary from './containers/Diary/Diary';
import GoldenThoughts from './containers/GoldenThoughts/GoldenThoughts';
import Pictures from './containers/Pictures/Pictures';
import Calendar from './containers/Calendar/Calendar';
import Notes from './containers/Notes/Notes';
import Contacts from './containers/Contacts/Contacts';
import SettingsPage from './containers/SettingsPage/SettingsPage';
import FrontPage from './components/FrontPage/FrontPage';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/ReristerPage/RegisterPage';


import { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import classes from './App.module.css';




class App extends Component {

  constructor(props) {
    super(props)
    this.props.onTryAutoSignup();

  }

  state = {
    continue: false,
    afterFrontPage: false

  }

  continueHandler = () => {
    this.setState({ continue: true });


    setTimeout(() => {
      this.setState({ afterFrontPage: true });
      if (!this.props.isAuth) {
        { this.props.history.push('/login') }
      };

      this.setState({ continue: false });

    }, 1000);


  }

  render() {

    let backgroundClass = this.props.warmMode ? classes.Warm : classes.Cold;


    return (
      <div className={backgroundClass}>
        {this.state.afterFrontPage ?
          <Layout>
            
            <Switch>
              <Route exact path='/home/contacts' component={Contacts} />
              <Route path='/account/settings' component={SettingsPage} />
            <Route path='/account/profile' component={ProfilePage} />
            <Route path='/account/' render={()=>(
            <Fragment>
              <ProfilePage/>
              <hr/><hr/>
              <h2 style={{textAlign:'center'}}>Settings:</h2>
              <SettingsPage/>
            </Fragment>)} />

              <Route exact path='/home/notes' component={Notes} />
              <Route exact path='/home/calendar' component={Calendar} />
              <Route exact path='/home/diary' component={Diary} />
              <Route exact path='/' component={null}></Route>
              <Route exact path='/home/pictures' component={Pictures}></Route>
              <Route exact path='/home/thoughts' component={GoldenThoughts} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
            </Switch>
          </Layout>
          :
          <FrontPage clicked={this.continueHandler} continue={this.state.continue} />}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuth())
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token ? true : false,
    warmMode: state.func.warmMode
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
