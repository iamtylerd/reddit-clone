'use strict';

const { Router } = require('express')
const router = Router()

const Create = require('../models/newPost')

router.use(require('./rootRoute'))
router.use(require('./loginRoute'))
router.use(require('./registerRoute'))
router.use(require('./singlePostRoute'))
router.get('/404', (req,res) => {
		res.render('404')
	})

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
})


router.use(require('./logoutRoute'))
router.use(require('./newPostRoute'))


	module.exports = router;

