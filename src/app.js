"use strict"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { browserHistory, hashHistory, IndexRoute, Route, Router } from 'react-router'

import reducers from './reducers'

import { addToCart } from './actions/cartActions'
import { getBooks, postBooks, deleteBooks, updateBooks } from './actions/booksActions'

import BooksList from './components/pages/booksList'
import Cart from './components/pages/cart'
import BooksForm from './components/pages/booksForm'
import Main from './main'

const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware)

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList} />
				<Route path="/admin" component={BooksForm} />
				<Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>
)

render(
	Routes,
	document.getElementById('app')
)