'use strict';
const Create = require('../models/newPost')

module.exports.newview = (req, res, err) => {
	const postId = req.params.id;
	Create
		.findById(postId)
		.then((post) => res.render('post', {post}))
		.catch(err)
}

