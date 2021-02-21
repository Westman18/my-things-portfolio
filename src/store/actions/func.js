import * as actionTypes from './actionTypes';

export const showMenu = () => {
    return {
        type: actionTypes.SHOW_MENU
    }
}

export const warmMode = (on) => {
    return {
        type: actionTypes.WARM_MODE,
        payload: on
    }
}