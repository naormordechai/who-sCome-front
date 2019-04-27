import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosLock } from "react-icons/io";
import injectSheet from 'react-jss'
import StorageService from '../../services/StorageService';

const styles = {
    dialog: {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(62,62,62, 0.9)',
        display: 'none',
        fontWeight: '500',
        fontSize: '18px',
        padding: '0 7px',
        zIndex:'1'
    },
    containerBtns: {
        width: '350px',
        padding: '30px 20px',
        backgroundColor: 'rgba(100,100,100, .5)',
        boxShadow: '1px 2px 1px #000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        transform: 'translate(0, 100px)',
        wordBreak: 'break-all',
        margin: '0 auto',
        borderRadius: '5px',

    },
    btns: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '20px',
        '& div': {
            borderRadius: '5px',
            padding: '5px 15px'
        },
        '& div:last-child': {
            backgroundColor: 'rgb(150,150,150)'
        },
        '& div:first-child': {
            backgroundColor: 'rgb(36,73,103)',
        }
    },
    active: {
        transition: '.3s',
        visibility: 'visible'
    },
    '@media(max-width:400px)': {
        containerBtns: {
            width: '100%'
        }
    }
}


class roomPreview extends React.Component {
    constructor(props) {
        super(props)
        this.dialog = React.createRef();
    }

    openDialog = (room, classes, localStorage) => {
        console.log(!!localStorage);
        if (room.persons.length !== room.maxPlayers || localStorage) {
            this.dialog.current.style.display = 'block'
        }
    }
    goBack = (e) => {
        e.stopPropagation()
        this.dialog.current.style.display = 'none'
    }

    goForward = (e, history) => {
        e.stopPropagation()
        history.push(`/enter password/${this.props.room._id}`)
    }

    // render persons => Its purpose is
    // if i belong to any room in the list i'll see it in => opacity = 0.5

    renderPersons = (room, classes, subHeader, history) => {
        if (room.persons.length === room.maxPlayers && StorageService.load(`pesronIn${room._id}`)) {
            return (
                <div
                    onClick={() => this.openDialog(room, classes, localStorage.getItem(`pesronIn${room._id}`))}
                    ref={e => this.roomPreview = e}
                    className={subHeader}>
                    <div ref={this.dialog} className={classes.dialog} onClick={this.goBack}>
                        <div className={classes.containerBtns}>
                            <div style={{ textAlign: 'center' }}>go to <span style={{
                                color: '#000',
                                fontWeight: '700', fontSize: '19px', textDecoration: 'underline'
                            }}>{room.roomName}</span>?</div>
                            <div className={classes.btns}>
                                <div>Back</div>
                                <div onClick={(e) => this.goForward(e, history)}>Go Forward</div>
                            </div>
                        </div>
                    </div>
                    <div>{room.roomName}</div>
                    <div>{room.persons.length}/{room.maxPlayers}</div>
                </div>
            )
        } else if (room.persons.length === room.maxPlayers && !StorageService.load(`pesronIn${room._id}`)) {
            return (
                <div
                    style={{ opacity: '.5' }}
                    onClick={() => this.openDialog(room, classes, localStorage.getItem(`pesronIn${room._id}`))}
                    ref={e => this.roomPreview = e}
                    className={subHeader}>
                    <div ref={this.dialog} className={classes.dialog} onClick={this.goBack}>
                        <div className={classes.containerBtns}>
                            <div style={{ textAlign: 'center' }}>go to <span style={{
                                color: '#000',
                                fontWeight: '700', fontSize: '19px', textDecoration: 'underline'
                            }}>{room.roomName}</span>?</div>
                            <div className={classes.btns}>
                                <div>Back</div>
                                <div onClick={(e) => this.goForward(e, history)}>Go Forward</div>
                            </div>
                        </div>
                    </div>
                    <div>{room.roomName}</div>
                    <IoIosLock />
                    <div>{room.persons.length}/{room.maxPlayers}</div>
                </div>
            )
        } else {
            return (
                <div
                    onClick={() => this.openDialog(room, classes, localStorage.getItem(`pesronIn${room._id}`))}
                    ref={e => this.roomPreview = e}
                    className={subHeader}>
                    <div ref={this.dialog} className={classes.dialog} onClick={this.goBack}>
                        <div className={classes.containerBtns}>
                            <div style={{ textAlign: 'center' }}>go to <span style={{
                                color: '#000',
                                fontWeight: '700', fontSize: '19px', textDecoration: 'underline'
                            }}>{room.roomName}</span>?</div>
                            <div className={classes.btns}>
                                <div>Back</div>
                                <div onClick={(e) => this.goForward(e, history)}>Go Forward</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ wordBreak: 'break-all', width: '65%' }}>{room.roomName}</div>
                    <div>{room.persons.length}/{room.maxPlayers}</div>
                </div>
            )
        }
    }

    render() {
        const { room, history, classes, subHeader } = this.props;
        return (
            <div>
                {this.renderPersons(room, classes, subHeader, history)}
            </div>
        )
    }
}



export default injectSheet(styles)(roomPreview)
