import axios from 'axios';
import { setAlert } from './alert';
import { GET_NOTIFICATIONS, UPDATE_NOTIFICATION, NOTIFICATION_ERROR } from './types';

//Get notifications
export const getNotifications = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/notifications/me');

		dispatch({
			type: GET_NOTIFICATIONS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Create a notification
export const createNotification = (notificationData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};
	try {
		const res = await axios.post('/api/notifications/', notificationData, config);

		dispatch(setAlert(`${res.data.msg}`, 'success'));
	} catch (err) {
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Update a notification's read status
export const updateNotification = (notificationId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/notifications/${notificationId}`);

		dispatch({
			type: UPDATE_NOTIFICATION,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
