'use strict';

const { Router } = require('express')
const router = Router()

const Create = require('../models/newPost')


// Route
	router.get('/', (req,res, err) =>
		Create
			.find()
			.sort({score: 1})
			.then((posts) => res.render('home', {posts}))
			.catch(err)
	)

	router.get('/new', (req,res) => {
		res.render('create',  { page: 'create' })
	})

	router.post('/:id/up', (req, res, next) => {
		console.log("up")
		res.redirect('/')
	})

	router.post('/:id/down', (req, res, next) => {
		
		res.redirect('/')
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

