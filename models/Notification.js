const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
	triggeredBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	notifyUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	notification: {
		type: String
	},
	read: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'post'
	}
});

module.exports = Notification = mongoose.model('notification', NotificationSchema);
