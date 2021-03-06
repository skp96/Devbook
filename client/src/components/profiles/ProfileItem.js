import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user: { _id, name, avatar }, status, company, location, skills } }) => {
	return (
		<div className='profile bg-light'>
			<img src={avatar} alt='' className='round-img' />
			<div>
				<h2>{name}</h2>
				<h2>
					{status} {company ? <span> at {company}</span> : null}
					<p className='my-1'>{location ? <span>{location}</span> : null}</p>
					<Link to={`/profile/${_id}`} className='btn btn-primary'>
						View Profile
					</Link>
				</h2>
			</div>
			<ul>
				<li>Skills</li>
				{skills.slice(0, 4).map((skill, idx) => (
					<li key={idx} className='text-primary'>
						<i className="fas fa-atom" />
						{' '}
						{skill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
