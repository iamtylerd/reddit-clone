'use strict';

const { Router } = require('express')
const router = Router()

const Create = require('../models/newPost')


// Route
	router.get('/', (req,res, err) =>
		Create
			.find()
			.sort({score: -1})
			.then((posts) => res.render('home', {posts}))
			.catch(err)
	)

	router.get('/new', (req,res) => {
		res.render('create',  { page: 'create' })
	})

	router.get('/:id', (req, res) => {
		const postId = req.params.id;
		Create
			.findById(postId)
			.then((post) => res.render('post', {post}))
	})

	router.post('/:id/up', (req, res, next) => {
		let one = 1;
		const postId = req.params.id;

		Create
			.findByIdAndUpdate(postId, {$inc: { score: 1} })
			.then(() => res.redirect('/'))
			.catch(console.error)
	})

	router.post('/:id/comment', (req, res, next) => {
		const postId = req.params.id;
		console.log(req.body.comments)
		Create
			.findByIdAndUpdate(postId,  {$push: {comments: req.body.comments}})
			.then(() => res.redirect('/:id'))
			.catch(console.error)
	})

	router.post('/:id/down', (req, res, next) => {
		let one = 1;
		const postId = req.params.id;

		Create
			.findByIdAndUpdate(postId, {$inc: { score: -1} })
			.then(() => res.redirect('/'))
			.catch(console.error)
	})

	router.get('/404', (req,res) => {
		res.render('404')
	})

	router.post('/new', (req, res, next) => {
		Create
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(next)
	})

	module.exports = router;

