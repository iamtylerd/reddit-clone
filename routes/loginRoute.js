'use strict';

const { Router } = require('express')
const router = Router()
const session = require('../controllers/sessionCtrl')
const passport = require('passport')

router.get('/login', session.new)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}))

module.exports = router
