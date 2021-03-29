const express = require('express')
const auth = require('./auth')
const post = require('./post')
const user = require('./user')
const router = express.Router();

router.use('/',auth)
router.use('/',post)
router.use('/',user)

module.exports = router;
