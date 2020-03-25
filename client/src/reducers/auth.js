import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GET_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
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
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
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