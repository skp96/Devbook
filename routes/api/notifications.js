const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Notification = require('../../models/Notification');
const Post = require('../../models/Post');

// @route - GET api/notifications/me
// @desc - Get the current user's notifications
// @access - Private
router.get('/me', auth, async (req, res) => {
	try {
		const notifications = await Notification.find({ notifyUser: req.user.id });

		if (!notifications) {
			return res.status(400).json({ msg: 'No notifications' });
		}

		const notificationsOrdered = notifications.reverse();

		res.json(notificationsOrdered);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route - POST api/notifications
// @desc - Create a notification
// @access- Private
router.post('/', auth, async (req, res) => {
	try {
		const newNotification = new Notification({
			triggeredBy: req.user.id,
			notifyUser: req.body.notifyUserId,
			notification: req.body.message,
			post: req.body.postId
		});

		await newNotification.save();

		res.status(200).json({ msg: 'Notification sent' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route - PUT api/notifications/:id
// @desc - Update a notification's read status
// @access- Private
router.put('/:id', auth, async (req, res) => {
	try {
		const notification = await Notification.findOneAndUpdate({ _id: req.params.id }, { read: true });

		res.json(notification);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
