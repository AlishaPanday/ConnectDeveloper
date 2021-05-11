import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  //generate random ids using uuid npm
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  //expiry set to remove alerts
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
