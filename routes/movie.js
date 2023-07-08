const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')

router.get('/', (req, res) => {
    return res.send('Hello World')
})

module.exports = router;