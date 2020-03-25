import axios from 'axios';
import {setAlert} from './alert';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GET_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken'

//Get User
export const getUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }catch(err) {

    localStorage.removeItem('token');

    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Signup User
export const signup = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({name, email, password});

  try {
    const res = await axios.post('/api/users', body, config);

    localStorage.setItem('token', res.data.token);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });

    dispatch(getUser());
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    localStorage.removeItem('token');

    dispatch({
      type: SIGNUP_FAIL
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post('/api/auth', body, config);
    
    localStorage.setItem('token', res.data.token);
    debugger

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(getUser())
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    localStorage.removeItem('token');

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout and Clear Profile
export const logout = () => dispatch => {

  localStorage.removeItem('token');

  dispatch({type: LOGOUT});
}