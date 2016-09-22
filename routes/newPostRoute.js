const { Router } = require('express')
const router = Router()
const newpost = require('../controllers/newPostCtrl')

router.get('/newpost', newpost.newform)

router.post('/newpost', newpost.create)

module.exports = router
