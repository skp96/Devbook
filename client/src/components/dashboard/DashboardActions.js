import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
	return (
		<Fragment>
			<div className='dash-buttons'>
				<Link to='edit-profile' className='btn btn-light'>
					<i class="fas fa-id-badge text-primary" /> Edit Profile
				</Link>
				<Link to='add-experience' className='btn btn-light'>
					<i class="fas fa-briefcase text-primary" /> Add Experience
				</Link>
				<Link to='add-education' className='btn btn-light'>
					<i class="fas fa-user-graduate text-primary" /> Add Education
				</Link>
			</div>
		</Fragment>
	);
};

export default DashboardActions;
