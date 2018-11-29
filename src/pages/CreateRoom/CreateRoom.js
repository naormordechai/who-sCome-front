import React from 'react'
import Card from '../../components/Card/Card'
import StorageService from '../../services/StorageService'
import * as actionCreators from '../../store/actions/index'
import Dialog from '../../components/Dialog/Dialog'
import { connect } from 'react-redux'

class CreateRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: {
                roomName: '',
                password: '',
                maxPlayers: 0,
                persons: [],
                date: 0,
                time: '',
            },
            requestedId: '',
            requestedNames: [],
            isDisabled: true,
            requestedRoom: {},
            dialogData: {
                isWrong: false
            },
            isCreated: false
        }
    }

    handlerText = (e, textInput) => {
        var isDisabled;
        const requestedNames = this.props.rooms.filter(room => room.roomName === e.target.value);
        if (requestedNames.length ||
            !e.target.value.length ||
            !this.state.room.password.length ||
            !this.state.room.maxPlayers ||
            !this.state.room.date ||
            !this.state.room.time) {
            isDisabled = true
        } else {
            isDisabled = false
        }
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                roomName: e.target.value
            },
            requestedNames,
            isDisabled
        })
    }

    hanlderPassword = (e) => {
        var isDisabled;
        if (!e.target.value.length ||
            !this.state.room.roomName.length ||
            !this.state.room.maxPlayers ||
            !this.state.room.date ||
            !this.state.room.time) isDisabled = true
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                password: e.target.value
            },
            isDisabled
        })
    }

    handlerMaxPlayers = (e) => {
        var isDisabled;
        if (!e.target.value.length ||
            !this.state.room.roomName.length ||
            !this.state.room.password.length ||
            !this.state.room.date ||
            !this.state.room.time) isDisabled = true
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                maxPlayers: +e.target.value
            },
            isDisabled
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isCreated && prevProps.rooms.length !== this.props.rooms.length) {
            const requestedRoom = this.props.rooms[this.props.rooms.length - 1];
                StorageService.store(requestedRoom._id, requestedRoom._id)
                this.props.history.push(`/room/${requestedRoom._id}`)
        }
        // const requestedRoom = this.props.rooms.find(room => room.roomName === this.state.room.roomName)
        // if (requestedRoom) {
        //     StorageService.store(requestedRoom._id, requestedRoom._id)
        //     this.props.history.push(`/room/${requestedRoom._id}`)
        // }
        // if (prevProps.rooms.length !== this.props.rooms.length && this.props.history.action !== 'POP') {
        //     StorageService.store(requestedRoom._id, requestedRoom._id)
        //     this.props.history.push(`/room/${requestedRoom._id}`)
        // } else if (this.props.history.action === 'POP' && this.props.rooms.length === prevProps.rooms.length + 1) {
        //     StorageService.store(requestedRoom._id, requestedRoom._id)
        //     this.props.history.push(`/room/${requestedRoom._id}`)
        // }
    }


    number = 1;
    addRoom = () => {
        if (this.number === 1) {
            this.props.onAddRoom(this.state.room)
            this.setState({
                ...this.state,
                disabled: true,
                isCreated: true
            })
            this.number++
        }

    }

    goBack = () => this.props.history.push('/')


    handleDate = (e) => {
        var isDisabled;
        if (!this.state.room.roomName.length ||
            !this.state.room.password.length ||
            !this.state.room.maxPlayers ||
            !this.state.room.time) isDisabled = true
        const date = e.getTime()
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                date
            },
            isDisabled
        })
    }

    closeDialog = () => {

        this.setState({
            ...this.state,
            dialogData: {
                ...this.state.dialogData,
                isWrong: false
            }
        })
    }

    openDialogDate = () => {
        this.setState({
            ...this.state,
            dialogData: {
                ...this.state.dialogData,
                isWrong: true
            }
        })
    }

    handlerTime = (e) => {
        var isDisabled;
        if (!e.target.value.length ||
            !this.state.room.roomName.length ||
            !this.state.room.password.length ||
            !this.state.room.maxPlayers ||
            !this.state.room.date) isDisabled = true
        this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                time: e.target.value
            },
            isDisabled
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    wrong={this.state.dialogData.isWrong}
                    closeDialog={this.closeDialog}
                    isCalender={true}
                    topStyle="30px"
                    handlerCalenderDate={this.handleDate}
                />
                <Card data={{
                    header: 'Create room:',
                    title1: 'Room name',
                    title2: 'password:',
                    title3: 'Max players:',
                    title4: 'Date'
                }} handlerText={this.handlerText}
                    hanlderPassword={this.hanlderPassword}
                    handlerMaxPlayers={this.handlerMaxPlayers}
                    handlerPositiveRequest={this.addRoom}
                    handlerNegativeRequest={this.goBack}
                    openDialogDate={this.openDialogDate}
                    handlerTime={this.handlerTime}
                    validateText={this.state.requestedNames}
                    validateLengthText={this.state.room.roomName}
                    isDisabled={this.state.isDisabled}
                    marginTop={25}
                    date={this.state.room.date}
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