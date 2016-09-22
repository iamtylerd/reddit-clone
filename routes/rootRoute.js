const { Router } = require('express')
const router = Router()
const home = require('../controllers/rootCtrl')
const upVote = require('../controllers/upVoteCtrl')
const DownVote = require('../controllers/downVoteCtrl')

router.get('/', home.new)
router.post('/:id/up', upVote.create)
router.post('/:id/down', DownVote.create)


module.exports = router
