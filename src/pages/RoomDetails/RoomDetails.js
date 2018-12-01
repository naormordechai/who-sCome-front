import React from 'react'
import injectSheet from 'react-jss'
import RoomService from '../../services/RoomService'
import BtnsContainer from '../../components/BtnsContainer/BtnsContainer'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import * as actionCreators from '../../store/actions/index'
import StorageService from '../../services/StorageService'
import InputComponent from '../../components/InputComponent/InputComponent'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { IoIosTrash } from "react-icons/io";
import Dialog from '../../components/Dialog/Dialog'
import io from 'socket.io-client'
import 'react-notifications/lib/notifications.css';

const styles = {
    containerDetails: {
        padding: '6px',
        backgroundColor: 'rgb(26,33,37)',
        borderRadius: '5px',
    },
    container: {
        padding: '5px 20px',
        maxWidth: '400px',
        margin: '0 auto'
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        textAlign: 'center',
        borderBottom: '3px solid #000',
        fontWeight: '500',
        marginBottom: '5px'
    },
    containerList: {
        height: 'calc(100vh - 300px)',
        overflowY: 'scroll',
        padding: '0 5px',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: '5px',
            background: '#000'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            background: '#888'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
        }
    },

    inputSearch: {
        borderRadius: '1000px',
        outline: 'none',
        border: 'none',
        padding: '4px 0px',
        transition: '.3s',
        textAlign: 'center',
        '&:focus': {
            padding: '4px 3px'
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '5px solid rgb(172,50,51)',
        marginBottom: '10px'
    },
    subHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 9px 0',
        padding: '10px 0',
        color: '#fff',
        textDecoration: 'none',
        borderBottom: '2px solid #000',
    },
    containerPerson: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '2px solid #000',
        fontSize: '18px',
        '& > *': {
            padding: '5px 0'
        },
        '& div:last-child': {
            fontSize: '13px'
        }
    },
    person: {
        display: 'flex',
        alignItems: 'center',
        '& div:first-child': {
            marginRight: '5px'
        }
    },
    '@media(max-width:400px)': {
        containerList: {
            height: 'calc(100vh - 360px)',
        }
    }
}

class RoomDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            room: RoomService.getRoomEmpty(),
            person: {
                name: '',
                addedAt: 0
            },
            disabled: true,
            personFromStorage: {},
            socket: io.connect(),
            isDialog: false,
            requestedPerson: {}
        }
    }

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    setTimeout(() => {
                        NotificationManager.info('Info message');
                    }, 1000);
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    }

    validateRoomPassword = async () => {
        if (!StorageService.load(this.props.match.params.id)) {
            this.props.history.replace(`/enter password/${this.props.match.params.id}`)
            return
        }
        await RoomService.getById(this.props.match.params.id)
            .then(({ data }) => {
                this.setState({
                    ...this.state,
                    room: data
                })
            })
    }

    handlerPersonFromStorage = async () => {
        if (localStorage.getItem(`pesronIn${this.props.match.params.id}`)) {
            await this.setState({
                ...this.state,
                personFromStorage: StorageService.load(`pesronIn${this.props.match.params.id}`)
            })
        }
        if (this.state.room.persons.length >= this.state.room.maxPlayers) {
            await this.setState({
                ...this.state,
                disabled: true
            })
        }
    }



    async componentDidMount() {
        await this.validateRoomPassword()
        this.handlerPersonFromStorage()
        this.state.socket.emit('join', this.state.room)
        this.state.socket.on('updateStateRoom', async (room) => {
            await this.setState({
                ...this.state,
                room
            })
        })
        // if (this.roomNameRef.innerText.length >= 32) this.roomNameRef.style.overflowX = 'scroll'

    }

    // if (this.roomNameRef.innerText.length >= 32) {
    //     this.roomNameRef.style.overflowX = 'scroll'
    // }

    validationDisabledBtn = () => {
        if (StorageService.load(`pesronIn${this.props.match.params.id}`)) {
            this.setState({
                ...this.state,
                disabled: true
            })
            return
        }
        if (this.state.person.name.length && this.state.room.persons.length !== this.state.room.maxPlayers) {
            this.setState({
                ...this.state,
                disabled: false
            })
        } else {
            this.setState({
                ...this.state,
                disabled: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.person.name !== prevState.person.name && this.state.room.persons.length < this.state.room.maxPlayers)
            || (this.state.room.persons.length !== prevState.room.persons.length)) {
            this.validationDisabledBtn()
        }
    }


    hanlderRefresh = () => {
        window.location.reload()
    }


    handlerBack = () => {
        this.props.history.push('/')
    }


    updatePerson = (e) => {
        this.setState({
            ...this.state,
            person: {
                name: e.target.value,
                addedAt: this.state.person.addedAt
            },
        })
    }

    handlerOpenDialog = (person) => {
        this.setState({
            ...this.state,
            isDialog: true,
            requestedPerson: person
        })
    }


    addPerson = async (ref) => {
        ref.current.value = ''
        const person = {
            name: this.state.person.name,
            addedAt: Date.now()
        };
        StorageService.store(`pesronIn${this.props.match.params.id}`, person)
        let persons = [...this.state.room.persons]
        persons = persons.concat(StorageService.load(`pesronIn${this.props.match.params.id}`))
        await this.setState({
            ...this.state,
            person,
            disabled: true,
            room: {
                ...this.state.room,
                persons
            },
            personFromStorage: StorageService.load(`pesronIn${this.props.match.params.id}`)

        })
        this.props.onAddPerson(this.state.room)
        this.state.socket.emit('join', this.state.room)
        this.state.socket.emit('updatedroom', this.state.room)
        this.state.socket.on('updateStateRoom', async (room) => {
            await this.setState({
                ...this.state,
                room
            })
        })
        return this.createNotification('success')()
    }

    handlerDeltePerson = async (person) => {
        const updatedPersons = [...this.state.room.persons].filter(p => p.addedAt !== person.addedAt);
        let requestedRoom = this.state.room;
        requestedRoom.persons = updatedPersons
        this.props.onDeletePerson(requestedRoom)
        localStorage.removeItem(`pesronIn${this.props.match.params.id}`)
        await this.setState({
            ...this.state,
            room: {
                ...this.state.room,
                persons: updatedPersons
            }
        })
        this.state.socket.emit('join', this.state.room)
        this.state.socket.emit('updatedroom', this.state.room)
        this.state.socket.on('updateStateRoom', async (room) => {
            await this.setState({
                ...this.state,
                room
            })
        })
    }

    handlerYes = (e) => {
        e.stopPropagation()
        this.handlerDeltePerson(this.state.requestedPerson)
        window.location.href = '/'
    }

    handlerCloseDialog = () => {
        this.setState({
            ...this.state,
            isDialog: false
        })
    }

    render() {
        const { classes } = this.props
        const { room } = this.state
        return (
            <div className={classes.container}>
                <Dialog
                    wrong={this.state.isDialog}
                    closeDialog={this.handlerCloseDialog}
                    yes={this.handlerYes}
                    title="Are You Sure?"
                    onCancel="No, Back To List."
                    onAccept="Yes"
                    topStyle="30%"
                />
                <InputComponent
                    width="100%"
                    placeholder="add you to the list..."
                    onClickProps={this.addPerson}
                    onChangeProps={this.updatePerson}
                    disabled={this.state.disabled}
                />
                <BtnsContainer
                    refresh={this.hanlderRefresh}
                    title="Back To Home"
                    action={this.handlerBack} />
                <div className={classes.containerDetails}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', borderBottom: '3px solid #000' }}>
                        <div>{moment(room.date).format("MMM Do YY")}</div>
                        <div>{room.time}</div>
                    </div>
                    <div ref={e => this.roomNameRef = e} className={classes.title}>{room.roomName}</div>
                    <div className={classes.header}>
                        <div>Person List</div>
                        <div>{room.persons.length}/{room.maxPlayers}</div>
                    </div>
                    <div className={classes.subHeader}>
                        <div>Name</div>
                        <div>Added At</div>
                    </div>
                    <div className={classes.containerList}>
                        {room.persons.map((person, idx) => (
                            <div className={classes.containerPerson} key={uniqid()}>
                                {this.state.personFromStorage.name === person.name &&
                                    this.state.personFromStorage.addedAt === person.addedAt ?
                                    <div className={classes.person}>
                                        <div><IoIosTrash onClick={() => this.handlerOpenDialog(person)} /></div>
                                        {/* <div><IoIosTrash onClick={() => this.handlerDeltePerson(person)} /></div> */}
                                        <div style={{wordBreak:'break-all', width:'75%'}}>{person.name}</div>
                                    </div>
                                    : <div style={{wordBreak:'break-all', width:'65%'}}>{person.name}</div>}
                                <div>{moment(person.addedAt).fromNow()}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onAddPerson: (room) => dispatch(actionCreators.updateRoom(room)),
        onDeletePerson: (room) => dispatch(actionCreators.updateRoom(room))
    }
}

export default compose(connect(null, mapStateToDispatch), injectSheet(styles))(RoomDetails)
