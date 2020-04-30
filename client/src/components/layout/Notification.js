import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Notification = ({ notifications, showNotifications }) => {
	const notificationList = notifications.length ? (
		notifications.map((notification) => (
			<Link to={`/posts/${notification.post}`} className='notification-item'>
				<li key={notification._id}>{notification.notification}</li>
			</Link>
		))
	) : (
		<li>No notifications</li>
	);
	return (
		<div className='dropdown-body'>
			{showNotifications ? <ul className='notification-content'>{notificationList}</ul> : ''}
		</div>
	);
};

Notification.propTypes = {};

export default Notification;
