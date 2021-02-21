import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    wasLogout: false,
    justRegistered: false

};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {
                error: null,
                loading: true,
                justRegistered: false
            });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                userName: action.userName,
                error: null,
                isDemo: action.isDemo,
                loading: false
            });

        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false
            });

        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null, //wiping out the auth data
                wasLogout: true,
                isDemo: false
            });
        case actionTypes.JUST_REGISTERED:
            return updateObject(state, {
                justRegistered: true,
                token: null
            })

        default:
            return state;
    }

}

export default reducer;