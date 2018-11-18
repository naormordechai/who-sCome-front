import React from 'react'
import { Link } from 'react-router-dom'

const roomPreview = ({ room, subHeader }) => (
    <Link to={`/enter password/${room._id}`} className={subHeader}>
        <div>{room.roomName}</div>
        <div>{room.persons.length}/{room.maxPlayers}</div>
    </Link>
)

export default roomPreview