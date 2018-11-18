import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'
const initialState = {
    rooms: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ROOMS:
            return {
                ...state,
                rooms: state.rooms.concat(action.rooms)
            }
    }
    return state
}

export default reducer