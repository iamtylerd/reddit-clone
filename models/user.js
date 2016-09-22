'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [HTML5_EMAIL_REGEX, 'Please enter a valid email'],
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.pre('save', function (cb) {
  const user = this
  bcrypt.hash(user.password, 15, (err, hash) => {
    if (err) {
      // stop so it doesnt store an undefined password
      return cb(err)
    }
    user.password = hash
    cb()
  })
})
//Class Method - static -
userSchema.statics.findOneByEmail = function (email, cb) {
  const collection = this
  return collection.findOne({ email }, cb)
}
// instance methods
userSchema.methods.comparePassword = function (password, cb) {
  const user = this
  if (typeof cb === 'function') {
    return bcrypt.compare(password, user.password, cb)
  }
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, user.password, (err, matches) =>
      err ? reject(err) : resolve(matches)
    )
  )
}

module.exports = mongoose.model('User', userSchema)
