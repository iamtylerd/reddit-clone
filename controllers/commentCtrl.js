'use strict';
const Create = require('../models/newPost')


module.exports.create = (req, res, err) => {
	const postId = req.params.id;
	Create
		.findByIdAndUpdate(postId, {
			$push: {
				comments: { comment: req.body.comments, userName: req.app.locals.name }
			}
		})
		.then(() => res.redirect(`/single/${postId}`))
		.catch(console.error)
}

