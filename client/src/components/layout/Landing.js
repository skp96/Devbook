import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {login} from '../../actions/auth'

const Landing = ({ isAuthenticated, login }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	const demoEmail = 'sunnykpatel1992@gmail.com'
	const demoPassword = '1234567'

	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Devbook</h1>
					<p className='lead'>
						Create a developer profile/portfolio, share posts and get help from other developers
					</p>
					<div className='buttons'>
						<Link to='/signup' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
						<p onClick={() => login(demoEmail, demoPassword)} className='btn btn-primary'>Demo Login</p>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Landing);
