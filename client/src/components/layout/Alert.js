import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment } from 'react';

const Alert = ({ alerts }) => {
	let displayAlerts;
	if (alerts !== null && alerts.length > 0) {
		displayAlerts = alerts.map((alert, idx) => (
			<div className={`alert alert-${alert.alertType}`} key={idx}>
				{alert.msg}
			</div>
		));
	}

	return <Fragment>{displayAlerts !== undefined ? displayAlerts : null}</Fragment>;
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
