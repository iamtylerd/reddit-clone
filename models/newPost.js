'use strict';
const mongoose = require('mongoose')

module.exports = mongoose.model('New', {
	title: String,
	url: String,
	user: String,
	score: {type: Number, default: 0},
	img: String,
	comments: [String]
});
