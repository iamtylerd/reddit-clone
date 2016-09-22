'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const chalk = require('chalk')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport')

const routes = require('./routes/')
const { connect } = require('./database')

const app = express();

//set a globabl port variable
const port = process.env.PORT || 3000
app.set('port', port)



//do not have to declare ejs / pug templates
app.set('view engine', 'pug');

if(process.env.NODE_ENV !== 'production') {
	app.locals.pretty = true
}
app.locals.company = "Reddit Clone"

app.use(session({
  store: new RedisStore({
  	url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'redditsecretkey'
}))


require('./passport-config')
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.email = req.user && req.user.email
  next()
})

app.use((req, res, next) => {
	app.locals.name = req.user && req.user.name
	next()
})

//Middlewares about routes
app.use((req, res, next) => {
	console.log(`${new Date()} ${chalk.cyan(req.method)} ${req.headers['user-agent']}`)

	//Call back to end the request
	next()
})
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use(routes)


//404 catch and pass to error handler
app.use((req, res) => {
	res.render('404')
})


//Error handling middleware - at bottom
app.use((err, req, res, next) => {
	res.sendStatus(err.status || 500)
	console.log(`${new Date()} ${chalk.red(req.method)} Error (${res.statusCode}):${res.statusMessage} ${req.headers['user-agent']}`)
	console.error(err.stack)
})

connect()
	.then(() => {
		// Only opens the port after connecting to Mongo
		app.listen(port, () =>
			console.log(`Express server listening on port ${port}`)
		)
	})
	.catch(console.error)

