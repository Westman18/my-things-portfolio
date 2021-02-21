import * as actionTypes from './actionTypes';
import axios from 'axios';

// import { fireAuth } from '../../firebase/index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, user, isDemo) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userName: user,
        isDemo: isDemo
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const justRegistered = () => {
    return {
        type: actionTypes.JUST_REGISTERED,

    }
}

export const checkAuth = () => {//to execute while refreshing
    return dispatch => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('user');

        // console.log(localStorage.getItem('token'))
        if (!token) {
            // dispatch(logout());

            console.log('no token')
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log(expirationDate)
            console.log(new Date())
            if (expirationDate > new Date()) {
                // axios.post()
                dispatch(authSuccess(token, id, user));
                dispatch(checkAuthTimeaut((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                // dispatch(logout());

                console.log('expired')
            }
        }

    };
}

export const checkAuthTimeaut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());//always execute so it is dispathed
        }, expirationTime * 1000);

    };
}

export const auth = (email, password, loginOrRegister) => {
    return dispatch => {//async function - action that can dispath other actions meanwhile using dispath(), also async code goes here
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let actionURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSV8DS-wVajKzMhnSSprjp-cePBXEnNkI';

        if (loginOrRegister === 'login') {
            actionURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSV8DS-wVajKzMhnSSprjp-cePBXEnNkI';
        }

        //email without end

        const user = email.slice(0, email.indexOf('@'));

        let isDemo = false;
        if (email === 'guest@guest.guest') {
            isDemo = true;
        }

        axios.post(actionURL, authData)
            .then(res => {
                console.log(res);
                console.log(user)
                dispatch(authSuccess(res.data.idToken, res.data.localId, user, isDemo));
                dispatch(checkAuthTimeaut(res.data.expiresIn));

                if (loginOrRegister === 'register') {
                    dispatch(justRegistered())
                    console.log('just')
                } else {
                    //setting the stored token with expiration date
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);//for ms

                    if (!isDemo) {
                        localStorage.setItem('id', res.data.localId);
                        localStorage.setItem('token', res.data.idToken);
                        localStorage.setItem('user', user);
                        localStorage.setItem('expirationDate', expirationDate);
                    }

                }
            }).catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error))

            })

    }
}
