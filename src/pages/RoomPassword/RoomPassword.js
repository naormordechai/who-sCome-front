import React from 'react'
import RoomService from '../../services/RoomService'
import WrongPassword from '../../components/WrongPassword/WrongPassword'
import StorageService from '../../services/StorageService'
import injectSheet from 'react-jss'

const styles = {
    container: {
        maxWidth: '300px',
        backgroundColor: 'rgb(26,33,37)',
        margin: 'auto',
        padding: '7px',
        borderRadius: '5px',
        transform: 'translate(0, 50px)', // needed
    },
    wrongPassword: {
        display: 'block',
    },
    title: {
        borderBottom: '5px solid rgb(172,50,51)',
        fontSize: '22px',
        marginBottom: '15px'
    },
    boxPassword: {
        backgroundColor: 'rgb(36,73,103)',
        display: 'flex',
        padding: '5px',
        borderRadius: '5px',
        alignItems: 'center',
        '& label:first-child': {
            marginRight: '10px',
        },
        '& input': {
            backgroundColor: 'rgb(17,22,25)',
            border: '0',
            borderRadius: '5px',
            padding: '3px',
            outline: 'none',
            textAlign: 'center',
            color: '#fff',
            fontSize: '15px',
            width: '100%'
        }
    },
    containerBtns: {
        display: 'flex',
        marginTop: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        fontWeight: '700',
        height: '30px',
        '& div': {
            borderRadius: '5px',
            transition: '.3s',
            '& span': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            },
            '& button': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: 'rgb(62,62,62)',
                outline: 'none',
                border: '0',
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                borderRadius: '5px'
            }
        },
        '& div:first-child': {
            flex: '0 0 50%',
            marginRight: '5px',
            '& button': {
                backgroundColor: 'rgb(36,73,103)',
            }
        },
        '& div:last-child': {
            flex: '1',
        },
        '& div:first-child:hover': {
            backgroundColor: 'rgba(36,73,103,0.5)',
        },
        '& div:last-child:hover': {
            backgroundColor: 'rgb(62,62,62,0.5)',
        },
        '& div:active': {
            transform: 'scale(.9)',
            outline: 'none',
        }
    }
}

class RoomPassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            roomInfo: {
                password: '',
                _id: ''
            },
            isWrong: false
        }
    }

    onChange = e => {
        this.setState({
            ...this.state,
            roomInfo: {
                password: e.target.value,
                _id: this.state.roomInfo._id
            }
        })
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            roomInfo: {
                password: this.state.roomInfo.password,
                _id: this.props.match.params.id
            }
        })
    }

    handlerPassword = () => {
        RoomService.checkPassword(this.state.roomInfo)
            .then(({ data }) => {
                if (!data) {
                    this.passwordRef.value = ''
                    this.setState({
                        ...this.state,
                        isWrong: true
                    })
                    return
                }
                StorageService.store(`${this.state.roomInfo._id}`, this.state.roomInfo._id)
                this.props.history.push(`/room/${this.state.roomInfo._id}`)
            })
    }

    closeDialog = () => {
        this.setState({
            ...this.state,
            isWrong: false
        })
        this.passwordRef.focus()
    }

    handlerCancel = () => this.props.history.push('/')

    render() {
        const { classes } = this.props
        const { isWrong } = this.state

        return (
            <div>
                <div className={classes.wrongPassword}>
                    <WrongPassword wrong={isWrong} closeDialog={this.closeDialog} />
                </div>
                <div className={classes.container}>
                    <div className={classes.title}>Password required</div>
                    <div className={classes.boxPassword}>
                        <div>
                            <label>Password:</label>
                        </div>
                        <div>
                            <input ref={e => this.passwordRef = e} onChange={this.onChange} type="password" autoFocus />
                        </div>
                    </div>
                    <div className={classes.containerBtns}>
                        <div>
                            <button onClick={this.handlerCancel}>Cancel</button>
                        </div>
                        <div>
                            <button onClick={this.handlerPassword}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default injectSheet(styles)(RoomPassword)