import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
	CLEAR_POSTS
} from '../actions/types';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				posts: [ payload, ...state.posts ],
				loading: false
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case DELETE_POST:
			const filteredPosts = state.posts.filter((post) => post._id !== payload);
			return {
				...state,
				posts: filteredPosts,
				loading: false
			};
		case UPDATE_LIKES:
			const updatedPosts = state.posts.map(
				(post) => (post._id === payload.postId ? { ...post, likes: payload.likes } : post)
			);
			return {
				...state,
				posts: updatedPosts,
				loading: false
			};
		case ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: payload },
				loading: false
			};
		case REMOVE_COMMENT:
			const filteredComments = state.post.comments.filter((comment) => comment._id !== payload);
			return {
				...state,
				post: { ...state.post, comments: filteredComments },
				loading: false
			};
		case CLEAR_POSTS:
			return {
				posts: [],
				post: null,
				loading: false,
				error: {}
			};
		default:
			return state;
	}
}
