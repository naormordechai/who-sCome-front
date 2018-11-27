import axios from 'axios'

const ROOM_URL = (process.env.NODE_ENV !== 'development')
    ? '/room'
    : '//localhost:8080/room';


async function query() {
    return await axios.get(ROOM_URL)
}

async function getById(id) {
    return await axios.get(`${ROOM_URL}/${id}`)
}

async function checkPassword(roomInfo) {
    return await axios.post(`${ROOM_URL}/checkPassword`, roomInfo)
}

async function addRoom(room) {
    return await axios.post(`${ROOM_URL}/addRoom`, room)
}

async function updateRoom(room) {
    return await axios.post(`${ROOM_URL}/${room._id}`, room)
}

function getRoomEmpty() {
    return {
        roomName: '',
        password: '',
        maxPlayers: 0,
        persons: []
    }
}

export default {
    query,
    getById,
    checkPassword,
    addRoom,
    updateRoom,
    getRoomEmpty
}
