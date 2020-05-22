import React from 'react';
import { Link } from 'react-router-dom';

const Notification = ({ notifications, showNotifications, updateNotification }) => {
	const notificationList = notifications.length ? (
		notifications.map(
			(notification) =>
				notification.read ? (
					<Link to={`/posts/${notification.post}`} className='notification-item'>
						<li key={notification._id}>{notification.notification}</li>
					</Link>
				) : (
					<Link
						to={`/posts/${notification.post}`}
						className='notification-item'
						onClick={() => updateNotification(notification._id)}
					>
						<i class='far fa-circle' />
						{''}
						<li key={notification._id}>{notification.notification}</li>
					</Link>
				)
		)
	) : (
		<li>No notifications</li>
	);
	return (
		<div className='dropdown-body'>
			{showNotifications ? <ul className='notification-content'>{notificationList}</ul> : ''}
		</div>
	);
};

export default Notification;
