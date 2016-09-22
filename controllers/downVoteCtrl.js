'use strict';
const Create = require('../models/newPost')


module.exports.create = (req, res, err) => {
		let one = 1;
		const postId = req.params.id;
		Create
			.findByIdAndUpdate(postId, {$inc: { score: -1} })
			.then(() => res.redirect('/'))
			.catch(console.error)
}
