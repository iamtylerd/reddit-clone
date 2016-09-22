'use strict';

const { Router } = require('express')
const router = Router()
const session = require('../controllers/sessionCtrl')

router.get('/logout', session.edit)
router.post('/logout', session.destroy)

module.exports = router
