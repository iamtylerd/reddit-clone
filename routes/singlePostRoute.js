const { Router } = require('express')
const router = Router()
const single = require('../controllers/singlePostCtrl')
const comment = require('../controllers/commentCtrl')

router.get('/single/:id', single.newview)
router.post('/single/:id/comment', comment.create)

module.exports = router;
