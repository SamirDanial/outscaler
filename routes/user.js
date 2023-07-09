const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();



router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Your password should be 6 character or more').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: 'User already exists' });
      }

      user = new User({ name, email, password, isAdmin});

      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('secret'), { expiresIn: 360000}, (err, token) => {
        if(err) {
          throw err;
        }
        res.json({token});
      })
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server internal error');
    }
  }
);

module.exports = router;