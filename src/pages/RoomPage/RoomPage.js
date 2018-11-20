import React from 'react'
import RoomList from '../../components/RoomList/RoomList'
import { compose } from 'redux'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

const styles = {
    dialog: {
        backgroundColor: 'rgb(26,33,37)',
    },
    btnsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '5px',
        '& > *': {
            backgroundColor: 'rgb(47,94,133)',
            border: 'none',
            padding: '0 20px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '1000px',
            cursor: 'pointer',
        },
        '& div:nth-child(2)': {
            backgroundColor: 'rgb(62,62,62)'
        }

    },
    container: {
        maxWidth: '750px',
        margin: '50px auto'
    }
}

class RoomPage extends React.Component {

    hanldeRefresh = () => {
        window.location.reload()
    }

    goToCreateRoom = () => this.props.history.push('/create room')


    render() {
        const { classes, rooms, history } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.btnsContainer}>
                    <div onClick={this.hanldeRefresh}>Refresh</div>
                    <div>Join Room</div>
                    <div onClick={this.goToCreateRoom}>Create Room</div>
                </div>
                <div className={classes.dialog}>
                    <RoomList rooms={rooms} history={history}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms
    }
}

export default compose(
    connect(mapStateToProps),
    injectSheet(styles)
)(RoomPage)