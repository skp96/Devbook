import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Notification from './Notification';
import { updateNotification } from '../../actions/notification';

const Navbar = ({
	auth: { isAuthenticated, loading },
	logout,
	notification: { notifications },
	updateNotification
}) => {
	const [ showNotifications, setNotifications ] = useState(false);
	const container = React.createRef();

	useEffect(() => {
		document.addEventListener('click', hideNotification);

		return () => {
			document.removeEventListener('click', hideNotification);
		};
	});

	const hideNotification = (e) => {
		if (container.current && !container.current.contains(e.target)) {
			setNotifications(false);
		}
	};

	const authLinks = (
		<ul className='links'>
			<li>
				<Link to='/profiles'>
					<i class="fas fa-laptop-code" />
					{' '}
					Developers
				</Link>
			</li>
			<li>
				<Link to='/posts'>
					<i class="fas fa-scroll" />
					{' '}
					Posts
				</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user' />
					{' '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li onClick={() => setNotifications(!showNotifications)} className='notifications'>
				<i className='className fas fa-exclamation' />
				{' '}
				<span className='hide-sm'>Notifications</span>
				<Notification
					notifications={notifications}
					showNotifications={showNotifications}
					updateNotification={updateNotification}
				/>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fas fa-sign-out-alt' />
					{' '}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='links'>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/signup'>Signup</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<Fragment>
			<nav className='navbar bg-light' ref={container}>
				<h1>
					<Link to='/'>
						<i className="fas fa-laptop-code" />Devbook
					</Link>
				</h1>
				{!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
			</nav>
		</Fragment>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	notification: PropTypes.object.isRequired,
	updateNotification: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	notification: state.notification
});

export default connect(mapStateToProps, { logout, updateNotification })(Navbar);
