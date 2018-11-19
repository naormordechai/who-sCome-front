import React from 'react'
import Card from '../../components/Card/Card'
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
            currentId: ''
        }
    }

    handlerText = (e) => {
        this.setState({
            ...this.state,
            room: {
                roomName: e.target.value,
                password: this.state.room.password,
                maxPlayers: this.state.room.maxPlayers,
                persons: this.state.room.persons
            }
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

    addRoom = () => {
        this.props.onAddRoom(this.state.room)
    }

    goBack = () => {
        this.props.history.push('/')
    }

    render() {
        console.log(this.props);
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