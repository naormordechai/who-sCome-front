import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'
const initialState = {
    rooms: [],
    isExsistRoom: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ROOMS:
            return {
                ...state,
                rooms: state.rooms.concat(action.rooms)
            }
        case actionTypes.ADD_ROOM:
            return {
                ...state,
                rooms: state.rooms.concat(action.room)
            }
        case actionTypes.EXSIST_ROOM:
            return {
                ...state,
                isExsistRoom: action.exsist
            }
    }
    return state
}

export default reducer