'use strict';
const mongoose = require('mongoose')

module.exports = mongoose.model('New', {
	title: String,
	url: String,
	user: String,
	score: Number,
	img: String
});
