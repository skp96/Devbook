import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {login} from '../../actions/auth'
import video from '../../img/teamwork.mp4';
import poster from '../../img/development_team.jpg';


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
						A Facebook for Developers! Create a developer profile, and share ideas and thoughts while supporting the developer community.
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
					<div className='icons my-2'>
						<a href='https://skp96.github.io/SunnyKPatel/' target='_blank' rel='noopener noreferrer'>
							<i className='fas fa-globe fa-2x' />
						</a>
						{' '}
						<a href='https://github.com/skp96' target='_blank' rel='noopener noreferrer'>
							<i className="fab fa-github fa-2x" />
						</a>
						{' '}
						<a href='https://www.linkedin.com/in/sunny-patel-b0729858/' target='_blank' rel='noopener noreferrer'>
							<i class="fab fa-linkedin-in fa-2x" />
						</a>
					</div>
				</div>
			</div>
			<video className='team' autoPlay muted loop poster={poster}>
				<source src={video} type='video/mp4'></source>
			</video>
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
