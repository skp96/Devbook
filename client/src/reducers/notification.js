import { GET_NOTIFICATIONS, UPDATE_NOTIFICATION, NOTIFICATION_ERROR, CLEAR_NOTIFICATIONS } from './../actions/types';

const initialState = {
	notifications: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_NOTIFICATIONS:
			return {
				...state,
				notifications: payload,
				loading: false
			};
		case UPDATE_NOTIFICATION:
			const updatedNotifications = state.notifications.map(
				(notification) => (notification._id === payload._id ? { ...payload } : notification)
			);
			return {
				...state,
				notifications: updatedNotifications,
				loading: false
			};
		case NOTIFICATION_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case CLEAR_NOTIFICATIONS:
			return {
				...state,
				notifications: [],
				loading: false,
				errors: {}
			};
		default:
			return state;
	}
}
