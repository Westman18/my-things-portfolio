import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    showMenu: false
};


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SHOW_MENU:
            return updateObject(state, {
                showMenu: true
            });
        case actionTypes.WARM_MODE:
            return updateObject(state, {
                warmMode: action.payload
            });

        default:
            return state;
    }

}

export default reducer;