const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route - POST api/users
// @desc - Register user
// @access - Public
router.post(
	'/',
	[
		check('name', 'Please enter your full name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 7 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			// See if the user exists, if so send back error
			if (user) {
				res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
			}
			// Get users gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			// Encrypt password
			user = new User({
				name,
				email,
				avatar,
				password
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// Return jsonwebtoken
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}

		res.send('User route');
	}
);

module.exports = router;
