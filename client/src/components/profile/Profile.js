import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
	useEffect(
		() => {
			getProfileById(match.params.id);
		},
		[ getProfileById ]
	);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-lignt'>
						Back to Profiles
					</Link>
					{auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id ? (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit Profile
						</Link>
					) : null}
					<div class='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
