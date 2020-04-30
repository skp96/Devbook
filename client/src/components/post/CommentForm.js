import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { createNotification } from '../../actions/notification';

const CommentForm = ({ auth, post: { _id, user }, addComment, createNotification }) => {
	const [ text, setText ] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		const notificationData = {
			notifyUserId: user,
			message: `${auth.user.name} commented on your post`,
			postId: _id
		};
		await addComment(_id, { text });
		await createNotification(notificationData);
		setText('');
	};

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a Comment</h3>
			</div>
			<form className='form my-1' onSubmit={(e) => onSubmit(e)}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on the post'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	createNotification: PropTypes.func.isRequired
};

export default connect(null, { addComment, createNotification })(CommentForm);
