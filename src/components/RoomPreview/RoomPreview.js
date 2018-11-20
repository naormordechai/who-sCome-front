import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import Test from '../Test/Test'

const styles = {
    dialog: {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(62,62,62, 0.9)',
        display: 'none',
        fontWeight: 500,
        fontSize: '18px',
        padding: '0 7px'
    },
    containerBtns: {
        width: '250px',
        height: '100px',
        backgroundColor: 'rgb(100,100,100)',
        boxShadow:'1px 2px 1px #000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        transform: 'translate(0, 212%)',
        margin: '0 auto',
        borderRadius: '5px',
    },
    btns: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems:'center',
        '& div':{
            borderRadius:'5px',
            padding:'5px 15px'
        },
        '& div:last-child':{
            backgroundColor:'rgb(150,150,150)'
        },
        '& div:first-child': {
            backgroundColor: 'rgb(36,73,103)',
        }
    }
}




const roomPreview = ({ room, history, classes, subHeader }) => {
    // <Link to={`/enter password/${room._id}`} className={subHeader}>
    //     <div className={classes.dialog}>
    //     <div>go</div>
    //     <div>back</div>
    //     </div>
    //     <div>{room.roomName}</div>
    //     <div>{room.persons.length}/{room.maxPlayers}</div>
    // </Link>

    let dialog = React.createRef();

    const openDialog = (e) => {
        dialog.current.style.display = 'block'
    }

    const goBack = (e) => {
        e.stopPropagation()
        dialog.current.style.display = 'none'
    }

    const goForward = (e, history) => {
        e.stopPropagation()
        history.push(`/enter password/${room._id}`)
    }
    return (

        <div onClick={openDialog} className={subHeader}>
            <div ref={dialog} className={classes.dialog} onClick={goBack}>
                <div className={classes.containerBtns}>
                    <div style={{ textAlign: 'center' }}>go to <span style={{ color: '#000', 
                    fontWeight:'700', fontSize:'19px', textDecoration:'underline' }}>{room.roomName}</span>?</div>
                    <div className={classes.btns}>
                        <div>Back</div>
                        <div onClick={(e) => goForward(e, history)}>Go Forward</div>
                    </div>
                </div>
            </div>
            <div>{room.roomName}</div>
            <div>{room.persons.length}/{room.maxPlayers}</div>
        </div>
    )
}


export default injectSheet(styles)(roomPreview)
