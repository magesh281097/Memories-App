import { AUTH, LOGOUT } from '../../src/constants/actionTypes'

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log('state', state)
            // console.log('actions',action.data)
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        default:
            return state;
    }
}

// export default authReducer