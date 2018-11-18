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