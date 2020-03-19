import {SET_ALERT, REMOVE_ALERT} from '../actions/types'


const initialState = []

export default function(state= initialState, action) {
  const {type, payload} = action
  Object.freeze(state);
  let newState = [...state];

  switch(type) {
    case SET_ALERT: 
      return [...newState, payload];
    case REMOVE_ALERT:
      return newState.filter(alert => alert.id !== payload);
    default:
      return newState;
  }
}