import React from 'react'
import Card from '../../components/Card/Card'
import StorageService from '../../services/StorageService'
import * as actionCreators from '../../store/actions/index'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: {
                roomName: '',
                password: '',
                maxPlayers: 0,
                persons: []
            },
            requestedNames: [],
            isDisabled: true,
            requestedRoom: {}
        }
    }

    handlerText = (e, textInput) => {
        var isDisabled;
        const requestedNames = this.props.rooms.filter(room => room.roomName === e.target.value);
        if (requestedNames.length || !e.target.value.length) {
            isDisabled = true
        } else {
            isDisabled = false
        }
        this.setState({
            ...this.state,
            room: {
                roomName: e.target.value,
                password: this.state.room.password,
                maxPlayers: this.state.room.maxPlayers,
                persons: this.state.room.persons
            },
            requestedNames,
            isDisabled
        })
    }

    hanlderPassword = (e) => {
        this.setState({
            ...this.state,
            room: {
                roomName: this.state.room.roomName,
                password: e.target.value,
                maxPlayers: this.state.room.maxPlayers,
                persons: this.state.room.persons
            }
        })
    }

    handlerMaxPlayers = (e) => {
        this.setState({
            ...this.state,
            room: {
                roomName: this.state.room.roomName,
                password: this.state.room.password,
                maxPlayers: +e.target.value,
                persons: this.state.room.persons
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const requestedRoom = this.props.rooms.find(room => room.roomName === this.state.room.roomName)
        if (prevProps.rooms.length !== this.props.rooms.length && this.props.history.action !== 'POP') {
            StorageService.store(requestedRoom._id, requestedRoom._id)
            this.props.history.push(`/room/${requestedRoom._id}`)
        } else if (this.props.history.action === 'POP' && this.props.rooms.length === prevProps.rooms.length + 1) {
            StorageService.store(requestedRoom._id, requestedRoom._id)
            this.props.history.push(`/room/${requestedRoom._id}`)
        }
    }

    addRoom = () => {
        this.props.onAddRoom(this.state.room)
    }

    goBack = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Card data={{
                    header: 'Create room:',
                    title1: 'Room name',
                    title2: 'password:',
                    title3: 'Max players:'
                }} handlerText={this.handlerText}
                    hanlderPassword={this.hanlderPassword}
                    handlerMaxPlayers={this.handlerMaxPlayers}
                    handlerPositiveRequest={this.addRoom}
                    handlerNegativeRequest={this.goBack}
                    validateText={this.state.requestedNames}
                    validateLengthText={this.state.room.roomName}
                    isDisabled={this.state.isDisabled}
                    marginTop={25}
                >
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        isExsistRoom: state.isExsistRoom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddRoom: (room) => dispatch(actionCreators.addRoom(room))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)