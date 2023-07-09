const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.post(
    '/',
    [
      check('email', 'Please enter a valid email address').isEmail(),
      check('password', 'please enter password').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        const payload = {
          user: {
            id: user.id,
            isAdmin: user.isAdmin
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