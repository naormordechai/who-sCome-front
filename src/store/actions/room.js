import * as actionTypes from './actionTypes'
import RoomService from '../../services/RoomService'

const _loadRooms = (rooms) => {
    return {
        type: actionTypes.LOAD_ROOMS,
        rooms
    }
}

export const loadRooms = () => dispatch => {
    RoomService.query()
        .then(({ data }) => dispatch(_loadRooms(data)))
}

const _addRoom = (room) => {
    return {
        type: actionTypes.ADD_ROOM,
        room
    }
}

const _updateIsExsistRoom = (exsist) => {
    return {
        type: actionTypes.EXSIST_ROOM,
        exsist
    }
}

export const addRoom = (room) => dispatch => {
    RoomService.addRoom(room)
        .then(({ data }) => {
            if (!data) {
                return dispatch(_updateIsExsistRoom(data))
            } else {
                return dispatch(_addRoom(data))
            }
        })
}