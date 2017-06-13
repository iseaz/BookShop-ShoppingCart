var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bookshop')

const db = mongoose.connection
db.on('error', console.error.bind(console, '#MongoDB - connection error'))

app.use(session({
	secret: 'mySecretString',
	saveUninitialized: false,
	resave: true,
	store: new MongoStore({
		mongooseConnection: db,
		ttl: 2 * 24 * 60 * 60
	})
}))

app.post('/cart', (req, res) => {
	let cart = req.body

	req.session.cart = cart

	req.session.save(err => {
		if (err) {
			throw err
		}

		res.json(req.session.cart)
	})
})

app.get('/cart', (req, res) => {
	if (typeof req.session.cart !== 'undefined') {
		res.json(req.session.cart)
	}
})

const Books = require('./models/books.js')

app.post('/books', (req, res) => {
	let book = req.body

	Books.create(book, (err, books) => {
		if (err) {
			throw err
		}

		res.json(books)
	})
})

app.get('/books', (req, res) => {
	Books.find((err, books) => {
		if (err) {
			throw err
		}

		res.json(books)
	})
})

app.delete('/books/:_id', (req, res) => {
	let query = {
		_id: req.params._id
	}

	Books.remove(query, (err, books) => {
		if (err) {
			throw err
		}

		res.json(books)
	})
})

app.put('/books/:_id', (req, res) => {
	let book = req.body
	let query = req.params._id

	let update = {
		'$set': {
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	}

	let options = {
		new: true
	}

	Books.findOneAndUpdate(query, update, options, (err, books) => {
		if (err) {
			throw err
		}

		res.json(books)
	})
})

app.get('/images', (req, res) => {
	const imgFolder = __dirname + '/public/images/'
	const fs = require('fs')

	fs.readdir(imgFolder, (err, files) => {
		if (err) {
			throw err
		}

		const filesArr = []

		files.forEach(file => {
			filesArr.push({
				name: file
			})
		})

		res.json(filesArr)
	})
})

app.listen(3002, (err) => {
	if (err) {
		throw err
	}

	console.log('API Server is listening on http://localhost:3002')
})

module.exports = app;