'use strict';
const Create = require('../models/newPost')

module.exports.newform = (req, res) => {
	res.render('create', { page: 'create' })
}

module.exports.create = (req, res, err) => {
	Create
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(err)
}

