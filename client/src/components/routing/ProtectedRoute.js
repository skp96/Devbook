import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (!isAuthenticated && !loading ? <Redirect to='/signup' /> : <Component {...props} />)}
	/>
);

ProtectedRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
