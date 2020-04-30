import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { createNotification } from '../../actions/notification';

const PostItem = ({
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
	addLike,
	removeLike,
	deletePost,
	showActions,
	createNotification
}) => {
	const likeNotification = async () => {
		const notificationData = {
			notifyUserId: user,
			message: `${auth.user.name} liked your post`,
			postId: _id
		};

		await addLike(_id);
		await createNotification(notificationData);
	};

	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
				</p>

				{showActions ? (
					<Fragment>
						<button type='button' className='btn btn-light' onClick={() => likeNotification()}>
							<i className='fas fa-thumbs-up' />
							{likes.length > 0 ? <span>{likes.length}</span> : null}
						</button>
						<button type='button' className='btn btn-light' onClick={() => removeLike(_id)}>
							<i className='fas fa-thumbs-down' />
						</button>
						<Link to={`/posts/${_id}`} className='btn btn-primary'>
							Discussion{' '}
							{comments.length > 0 ? <span className='comment-count'>{comments.length}</span> : null}
						</Link>
						{!auth.loading && user === auth.user._id ? (
							<button onClick={() => deletePost(_id)} type='button' className='btn btn-danger'>
								<i className='fas fa-times' />
							</button>
						) : null}
					</Fragment>
				) : null}
			</div>
		</div>
	);
};

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	createNotification: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, createNotification })(PostItem);