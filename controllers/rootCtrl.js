'use strict';
const Create = require('../models/newPost')


module.exports.new = (req, res, err) =>
	Create
		.find()
		.sort({score: -1})
		.then((posts) => res.render('home', {posts}))
		.catch(err)
