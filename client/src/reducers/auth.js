import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GET_USER,
  AUTH_ERROR
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case SIGNUP_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    default:
      return state;
  }
}