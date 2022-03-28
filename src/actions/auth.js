import * as api from '../api'
import { AUTH } from '../../src/constants/actionTypes'

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        // console.log('data', data)
        dispatch({ type: AUTH, data: data })
        history('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data: data })
        history('/')
    } catch (error) {
        console.log(error)
    }
}