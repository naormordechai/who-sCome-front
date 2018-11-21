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
    return await axios.put(`${ROOM_URL}/${room._id}`, room)
}

export default {
    query,
    getById,
    checkPassword,
    addRoom,
    updateRoom
}
