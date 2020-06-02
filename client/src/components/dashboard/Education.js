import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import Moment from 'react-moment';

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td>
				<Moment format='MM/DD/YYYY'>{edu.from}</Moment> -{' '}
				{edu.to ? <Moment format='MM/DD/YYYY'>{edu.to}</Moment> : 'Now'}
			</td>
			<td className='hide-sm'>{edu.description}</td>
			<td>
				<button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className='my-2'>Education</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
						<th className='hide-sm'>Description</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
