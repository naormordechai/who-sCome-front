import React from 'react'
import RoomPreview from '../RoomPreview/RoomPreview'
import injectSheet from 'react-jss'

const styles = {
    container: {
        padding: '6px',
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
        marginBottom: '25px'
    },
    subHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 8px',
        color:'#fff',
        textDecoration:'none'
    },
}

const infRooms = (rooms) => {
    const personsCount = rooms.reduce((acc, val) => {
        return acc + val.persons.length
    }, 0)

    const roomsLength = rooms.length;
    return {
        personsCount,
        roomsLength
    }
}

const RoomList = ({ rooms, classes }) => (
    <div className={classes.container}>
        <div className={classes.header}>
            <div>Room list</div>
            {infRooms(rooms).roomsLength ?
                <div>{infRooms(rooms).personsCount} players in {infRooms(rooms).roomsLength} rooms</div>
                : null}

        </div>
        <div style={{ borderBottom: '1px solid grey', marginBottom: '8px' }} className={classes.subHeader}>
            <div>Name</div>
            <div>Players</div>
        </div>
        {rooms.map(room => (
                <RoomPreview key={room._id} room={room} subHeader={classes.subHeader}/>
        ))}
    </div>
)

export default injectSheet(styles)(RoomList)
