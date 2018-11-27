import React, { Component } from 'react';
import injectSheet from 'react-jss'
import * as actionCreators from './store/actions/index'
import StorageService from './services/StorageService'
import RoomService from './services/RoomService'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import RoomPage from './pages/RoomPage/RoomPage'
import RoomPassword from './pages/RoomPassword/RoomPassword'
import RoomDetails from './pages/RoomDetails/RoomDetails'
import CreateRoom from './pages/CreateRoom/CreateRoom'
import io from 'socket.io-client';
import Test from './components/Test/Test'
import './App.css';

const styles = {
  navbar: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#000',
    display: 'flex',
    height: '30px',
    alignItems: 'center',
    '& > *': {
      textDecoration: 'none',
      marginRight: '15px'
    },
    '& div:first-child': {
      display: 'flex',
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: '#244967',
      '& span': {
        padding: '0 7px'
      }
    },
  },
  navlink: {
    color: '#fff'
  },
  active: {
    color: '#bfcfe1'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.onLoadRooms()
  }

  render() {
    const { classes } = this.props
    return (
        <Router>
          <div className={classes.app}>
            <div className={classes.navbar}>
              <div>
                <span>who'sCome?</span>
              </div>
              <NavLink to="/" className={classes.navlink} exact activeClassName={classes.active}>Home |</NavLink>
              <NavLink to="/last five rooms" className={classes.navlink} exact activeClassName={classes.active}>Last 5 Rooms</NavLink>
            </div>
            <div>
              <Route path="/" exact component={RoomPage} />
              <Route path="/create room" exact component={CreateRoom} />
              <Route path="/enter password/:id" exact component={RoomPassword} />
              <Route path="/room/:id" exact component={RoomDetails} />
            </div>
          </div>
        </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadRooms: () => dispatch(actionCreators.loadRooms())
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  injectSheet(styles)
)(App)
