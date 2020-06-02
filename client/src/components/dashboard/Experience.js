import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import Moment from 'react-moment';

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				<Moment format='MM/DD/YYYY'>{exp.from}</Moment> -{' '}
				{exp.to ? <Moment format='MM/DD/YYYY'>{exp.to}</Moment> : 'Now'}
			</td>
			<td className='hide-sm'>{exp.description}</td>
			<td>
				<button className='btn btn-danger' onClick={() => deleteExperience(exp._id)}>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className='my-2'>Experience</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th className='hide-sm'>Description</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
