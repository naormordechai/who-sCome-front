import React from 'react'
import RoomList from '../../components/RoomList/RoomList'
import { compose } from 'redux'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import BtnsContainer from '../../components/BtnsContainer/BtnsContainer'
import InputComponent from '../../components/InputComponent/InputComponent'

const styles = {
    dialog: {
        backgroundColor: 'rgb(26,33,37)',
        borderRadius: '5px',
    },
    searchInput: {
        margin: '10px auto',
        textAlign: 'center',
        '& > input': {
            borderRadius: '500px',
            padding: '5px 15px',
            border: '0',
            width: '55%',
            outline: 'none',
            textAlign: 'center',
            fontSize: '17px',
            backgroundColor: 'rgb(26,33,37, .7)',
            color: '#fff',
            '&::placeholder': {
                color: '#fff',
                opacity: '.6'
            }
        }
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
        margin: '0 auto',
        padding: '0 20px'
    },
    '@media(max-width:400px)': {
        btnsContainer: {
            fontSize: '3.3vw',
            '& > *': {
                height: '7vw'
            }
        },
    },
    '@media(max-width:500px)': {
        searchInput: {
            '& > input': {
                width: '100%',
                fontSize: '3.8vw'
            }
        }
    }
}

class RoomPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            newRooms: [],
            filter: ''
        }
    }

    hanldeRefresh = () => {
        window.location.reload()
    }

    getCurrentRooms = (e) => {  // onchange for filter rooms in a search input
        const newRooms = [...this.props.rooms].filter(room => {
            return room.roomName.toLocaleLowerCase().includes(e.target.value)
        })
        this.setState({
            newRooms,
            filter: e.target.value
        })
    }

    getRequestedRooms = (rooms, history) => {
        if (!this.state.newRooms.length && !this.state.filter.length) {
            return <RoomList rooms={rooms} history={history} />
        } else {
            return <RoomList rooms={this.state.newRooms} history={history} />
        }
    }


    goToCreateRoom = () => this.props.history.push('/create room')

    render() {
        const { classes, rooms, history } = this.props;
        return (
            <div className={classes.container}>
                <InputComponent
                 onChangeProps={this.getCurrentRooms}
                 placeholder="start to search your team..."
                 />
                <BtnsContainer
                    refresh={this.hanldeRefresh}
                    title="Create Room"
                    action={this.goToCreateRoom} />
                <div className={classes.dialog}>
                    {this.getRequestedRooms(rooms, history)}
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